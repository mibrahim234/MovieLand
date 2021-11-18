const router = require('express').Router();
const Review = require ('../../models');

router.post('/', (req, res) => {
    Review.create({
        reviewId:req.body.reviewId,
        username:req.body.username,
        reviewTitle:req.body.reviewTitle,
        reviewText:req.body.reviewText,
        imdbId: req.body.imdbid
    })
    .then(dbReviewData => {
        req.session.user_id=dbReviewData.id;
        req.session.reviewId = dvReviewData.id;
        req.session.username = dbReviewData.username;
        req.session.reviewTitle =dbReviewData.reviewTitle,req.session.reviewText= dbReviewData.reviewText,
        req.session.imdbId = db.Review.Data.imdbId,
        req.session.loggedIn = true;

        res.json(dbReviewData)
    })
})