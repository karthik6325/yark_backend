const Investment = require('../model/investmentsmodel');


exports.addInvestment = async (req, res) => {
  const { selectedType, formData } = req.body;
  const { userId } = req.userId;

  const investmentData = formData;

  if (!userId || !selectedType || !investmentData) {
    return res.status(400).json({ error: 'userId, investmentType, and investmentData are required.' });
  }

  try {
    let investment = await Investment.findOne({ userId });

    if (investment) {
      // userId exists, update the relevant investment
      switch (selectedType) {
        case 'Life insurance':
          investment.lifeInsurance.push(investmentData);
          break;
        case 'Gold':
          investment.investmentPortfolio.push(investmentData);
          break;
        case 'Shares':
          investment.investmentPortfolio.push(investmentData);
          break;
        case 'Mutual funds':
          investment.investmentPortfolio.push(investmentData);
          break;
        case 'Bonds':
          investment.investmentPortfolio.push(investmentData);
          break;
        case 'Crypto':
          investment.investmentPortfolio.push(investmentData);
          break;
        case 'Other investments':
          investment.otherInvestmets.push(investmentData);
          break;
        default:
          return res.status(400).json({ error: 'Invalid investment type.' });
      }
      await investment.save();
      return res.status(200).json({ message: 'Investment updated successfully.', investment });
    } else {
      // userId does not exist, create a new investment document
      const newInvestment = new Investment({
        userId,
        lifeInsurance: selectedType === 'lifeInsurance' ? [investmentData] : [],
        investmentPortfolio: selectedType === 'portfolio' ? [investmentData] : [],
        otherInvestmets: selectedType === 'other' ? [investmentData] : [],
      });

      await newInvestment.save();
      return res.status(201).json({ message: 'Investment created successfully.', newInvestment });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};

exports.updateInvestment = async (req, res) => {
  const { userId, investmentType, number, investmentData } = req.body;

  if (!userId || !investmentType || !number || !investmentData) {
    return res.status(400).json({ error: 'userId, investmentType, number, and investmentData are required.' });
  }

  try {
    let investment = await Investment.findOne({ userId });

    if (!investment) {
      return res.status(404).json({ error: 'Investment not found.' });
    }

    let updated = false;

    switch (investmentType) {
      case 'lifeInsurance':
        let lifeInsurance = investment.lifeInsurance.find(item => item.Number === number);
        if (!lifeInsurance) return res.status(404).json({ error: 'Life insurance not found.' });
        lifeInsurance.set(investmentData);
        updated = true;
        break;
      case 'portfolio':
        let portfolio = investment.investmentPortfolio.find(item => item.Number === number);
        if (!portfolio) return res.status(404).json({ error: 'Investment portfolio not found.' });
        portfolio.set(investmentData);
        updated = true;
        break;
      case 'other':
        let other = investment.otherInvestmets.find(item => item.Number === number);
        if (!other) return res.status(404).json({ error: 'Other investment not found.' });
        other.set(investmentData);
        updated = true;
        break;
      default:
        return res.status(400).json({ error: 'Invalid investment type.' });
    }

    if (updated) {
      await investment.save();
      return res.status(200).json({ message: 'Investment updated successfully.', investment });
    } else {
      return res.status(404).json({ error: 'Investment not found.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete Investment Route
exports.deleteInvestment = async (req, res) => {
  const { userId, investmentType, number } = req.body;

  if (!userId || !investmentType || !number) {
    return res.status(400).json({ error: 'userId, investmentType, and number are required.' });
  }

  try {
    let investment = await Investment.findOne({ userId });

    if (!investment) {
      return res.status(404).json({ error: 'Investment not found.' });
    }

    let removed = false;

    switch (investmentType) {
      case 'lifeInsurance':
        investment.lifeInsurance = investment.lifeInsurance.filter(item => item.Number !== number);
        removed = true;
        break;
      case 'portfolio':
        investment.investmentPortfolio = investment.investmentPortfolio.filter(item => item.Number !== number);
        removed = true;
        break;
      case 'other':
        investment.otherInvestmets = investment.otherInvestmets.filter(item => item.Number !== number);
        removed = true;
        break;
      default:
        return res.status(400).json({ error: 'Invalid investment type.' });
    }

    if (removed) {
      await investment.save();
      return res.status(200).json({ message: 'Investment deleted successfully.', investment });
    } else {
      return res.status(404).json({ error: 'Investment not found.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.getAllInvestments = async (req, res) => {
  const { userId } = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }

  try {
    let investment = await Investment.findOne({ userId });

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