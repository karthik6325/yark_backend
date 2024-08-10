const Review = require('../model/reviewmodel')

exports.addReview = async (req, res) => {
    try {
      const { name, rating, description, image } = req.body;
  
      let imageBuffer = undefined;
      let imageMimetype = undefined;
  
      if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        imageBuffer = Buffer.from(base64Data, 'base64');
        imageMimetype = 'image/png'; 
      }
  
      const newReview = new Review({
        name,
        rating,
        description,
        image: image ? { data: imageBuffer, contentType: imageMimetype } : undefined,
      });
  
      await newReview.save();
      res.status(201).json({ message: 'Review submitted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to submit review' });
    }
  };

exports.getPendingReviews = async (req, res) => {
    try {
      const pendingReviews = await Review.find({ status: 'pending' });
      res.status(200).json(pendingReviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch pending reviews' });
    }
  };

exports.acceptRequest =  async (req, res) => {
    try {
      const { reviewId } = req.body;
      
      // Find the review and update its status to 'accepted'
      const review = await Review.findByIdAndUpdate(
        reviewId,
        { status: 'accepted' },
        { new: true } // Return the updated review
      );
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      
      res.json({ message: 'Review accepted', review });
    } catch (error) {
      console.error('Error accepting review:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.rejectRequest =  async (req, res) => {
    try {
      const { reviewId } = req.body;
      
      // Find the review and update its status to 'rejected'
      const review = await Review.findByIdAndUpdate(
        reviewId,
        { status: 'rejected' },
        { new: true } // Return the updated review
      );
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      
      res.json({ message: 'Review rejected', review });
    } catch (error) {
      console.error('Error rejecting review:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.getApprovedReviews = async (req, res) => {
  try {
    const approvedReviews = await Review.find({ status: 'accepted' });
    res.status(200).json(approvedReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};