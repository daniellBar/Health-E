import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";


export class Reviews extends Component {
  state = {
    activity: null,
    txt: "",
    rateType: "simple-controlled",
    
  }

  componentDidMount() {
    this.setState({ activity: this.props.activity });
  }

  updateField = (ev) => {
    this.setState({ txt: ev.target.value });
  }

  keyPressed = (ev) => {
    if ((this.state.txt !== '') && (ev.keyCode === 13)) this.addReview();
  }
  
  getStars = (review)=>{
    let stars=[];
    const star ='★';
    for(let i =0; i< review.rate; i++){
      stars.push(star)
    }
    return stars;
  }

  render() {
    if (!this.state.activity) return <h2>Loading..</h2>;
    const { reviews } = this.state.activity;
    return (
      <section className="review-container">
        <h2> Reviews</h2>
        <div className="review-add">
          <div className="flex review-rate">
            <p className="p-rate">Rate {'&'}review:</p>
            
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend"></Typography>
                <Rating 
                  name={this.state.rateType}
                  value={this.props.rateAddByUser || 5}
                  onChange={(event, newValue) => {
                    this.props.onRate(newValue);
                  }}
                />
              </Box>
           
          </div>
          <form onSubmit={()=>this.props.addReview(this.state.txt)}>
            <input
              className="review-input"
              value={this.state.txt}
              onKeyUp={this.keyPressed}
              onChange={this.updateField}
            ></input>
            <button className="chat-button">
              <i className="far fa-paper-plane fa-2x"></i>
            </button>
          </form>
        </div>

        {reviews.map((review, idx) => {
          let stars= this.getStars(review);
          return (
            <div key={idx}>
              <div key={idx} className="text-mid-left">
                <img src={review.by.imgUrl} className="attending-img marg-5" alt="" />
                {stars.map((star,idx)=> <span key={idx} className="MuiRating-root">{star}</span>)}
                {<span>{`(${review.rate})`}</span>}       
              </div>
              <div className="rev-txt">
                {review.txt}
              </div>
            </div>
          );
        })}

      </section>
    );
  }
}
