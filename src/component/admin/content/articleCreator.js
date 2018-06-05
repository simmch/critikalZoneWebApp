import React, {Component} from 'react';
import _ from 'lodash';
import { saveArticle, uploadImage, getArticles } from '../../../actions/articleAction';


import { connect } from 'react-redux';

//////////////////////
// ADMIN CLASS ONLY //
//////////////////////
class ArticleCreator extends Component { 

  constructor(props){
    super(props);
  
    this.state = {
      header: '',
      tagLine: '',
      articleType: 'News',
      system: 'PS4',
      articleImage: '',
      isUploading: false,
      progress: 0,
      body: '',
      pictureUrl: '',
      picture: '',
      videoLink: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount(){
    this.props.getArticles();
  }

  handleChange(e){
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  
  handleUpload(e){
    this.setState({
      picture: e.target.files[0]
    });

    console.log(this.state.picture)
  }

  uploadFile(){
      this.props.uploadImage(this.state.picture).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(result => {
            this.setState({
              pictureUrl: result
            })

        })
    })
  }

///////////////////////////////////
// POST: Submit Data to Database //
///////////////////////////////////
handleSubmit(e){
    e.preventDefault();
    console.log(this.state.picture)
    
    this.uploadFile()
    
    const article = {
      header: this.state.header,
      tagLine: this.state.tagLine,
      articleType: this.state.articleType,
      system: this.state.system,
      body: this.state.body,
      videoLink: this.state.videoLink
  }

  setTimeout(()=> { 
    console.log('The picture URL is still: ' + this.state.pictureUrl); 
    const article2 = Object.assign({body: this.state.body, pictureUrl: this.state.pictureUrl}, article)
    console.log(article2)
    this.props.saveArticle(article2);
  }, 2000)
  
  console.log('Data saved!')  
  /////////////////////////////////// 
  // Resets the state back to nothing
  ///////////////////////////////////
    this.setState({
      header: '',
      tagLine: '',
      articleType: '',
      system: '',
      body: '',
      pictureUrl: '',
      videoLink: ''
    })
  }



//////////////////////////////
// Form for Data Population //
//////////////////////////////
// TODO
    render(){
        return(
            <div className="container-fluid"> 
            <div className="row">
              <div className="col-sm-8 offset-sm-3">
              <div className="col-sm-8">
                
                <form onSubmit={this.handleSubmit}>
                  {/* Header */}
                  <div className="form-group">
                  <label htmlFor="header">Header: </label>
                  <input
                    maxLength="50" 
                    className="form-control"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.header}
                    name="header"
                    placeholder="50 character limit"
                    required
                    />
                    </div>
                    {/* TagLine */}
                    <div className="form-group">
                    <label htmlFor="tagLine">Tag Line: </label>
                    <input  
                      maxLength="140"
                      className="form-control"
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.tagLine}
                      name="tagLine"
                      placeholder="140 character limit"
                      required
                    />
                    </div>
                    {/* Article Type */}
                    <div className="form-group">
                    <label htmlFor="articleType">Article Type</label>
                    <select required multiple className="form-control" name="articleType" onChange={this.handleChange}>
                    <option  value="News">News</option>
                    <option  value="Review">Review</option>
                    </select>
                    </div>
                    {/* System */}
                    <div className="form-group">
                    <label htmlFor="system">System</label>
                    <select required multiple className="form-control" name="system" onChange={this.handleChange}>
                    <option value="PS4">PS4</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Switch">Switch</option>
                    <option value="All">All</option>
                    </select>
                    </div>
                    {/* Body */}
                    <div className="form-group">
                    <label htmlFor="body">Body: </label>
                    <textarea className="form-control"
                    maxLength="2500" 
                    required
                    name="body"
                    onChange={this.handleChange}
                    value={this.state.body}
                    placeholder="2500 character limit"
                    />                
                    </div>
                    {/* Video Link */}
                    <div className="form-group">
                    <label htmlFor="videoLink">Video Link: </label>
                    <input  
                      className="form-control"
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.videoLink}
                      name="videoLink"
                      placeholder="Video link"
                    />
                    </div>

                    {/* img file upload */}  
                    <div className="input-group mb-3 form-group">
                      <div className="custom-file">
                        <label className="custom-file-label upload-group" htmlFor="img" placeholder="Select file">{this.state.picture.name}
                        <input type="file" accept="image/*" className="custom-file-input" onChange={this.handleUpload} id="img"/>
                        </label>
                      </div>
                    </div>

                    {/* Submit article */}
                    <div className="form-group">
                        <button className="btn btn-primary">Save Article</button>
                    </div>
                  </form>
                  {this.renderArticle()}
                  </div>
                </div>
              </div>
            </div>
        );
    }



////////////////////////////////////
// GET: Pull Data from Firebase   //
////////////////////////////////////

renderArticle(){
  return _.map(this.props.articles, (article, key) => {
    return(
      <div  key={key} className="jumbotron">
          <span className="float-right">{article.system}</span>
        <h3>{article.header}</h3>
        <img src={article.pictureUrl} className="img-thumbnail mx-auto d-block" />
        <p>{article.tagLine}</p>
      </div>
    );
  })
}

}

function mapStateToProps(state, ownProps){
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps, {saveArticle, uploadImage, getArticles})(ArticleCreator);