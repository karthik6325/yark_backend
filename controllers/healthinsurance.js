const Insurance = require('../model/healthInsurancemodel')

exports.addInsurance = async (req, res) => {
  const { selectedType, formData } = req.body;
  const { userId } = req.userId;

  const investmentData = formData;
  investmentData.userId = userId;
  console.log(investmentData)

  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }

  try {
    let investment = await Insurance.findOne({ userId });

    if (investment) {
      // userId exists, update the relevant investment
      investment.healthInsurance.push(investmentData);
      await investment.save();
      return res.status(200).json({ message: 'Investment updated successfully.', investment });
    } else {
      // userId does not exist, create a new investment document
      const newInvestment = new Insurance({
        userId,
        healthInsurance: [investmentData],
      });

      await newInvestment.save();
      return res.status(201).json({ message: 'Investment created successfully.', newInvestment });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};



exports.getAllInsurance = async (req, res) => {
  const { userId } = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }

  try {
    let investment = await Insurance.findOne({ userId });

    if (!investment) {
      return res.status(404).json({ error: 'Investment not found.' });
    }
    else {
      return res.status(200).json({ message: 'success', data: investment });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};