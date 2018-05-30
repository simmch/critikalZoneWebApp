import React, {Component} from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { saveArticle } from '../../../actions/articleAction';

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
      img: {}
    };
  
    // bind functions

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
      this.setState({
          [e.target.name]: e.target.value
      }, ()=> console.log(this.state));
  }


  handleSubmit(e){
      e.preventDefault();
      // Takes the current property state and pushes it to database
      const article = {
          header: this.state.header,
          tagLine: this.state.tagLine,
          articleType: this.state.articleType,
          system: this.state.system,
          body: this.state.body
      }
    this.props.saveArticle(article);
  }


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
                    className="form-control"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.header}
                    name="header"
                    placeholder="Article Header"
                    required
                    />
                    </div>
                    {/* TagLine */}
                    <div className="form-group">
                    <label htmlFor="tagLine">Tag Line: </label>
                    <input  
                      className="form-control"
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.tagLine}
                      name="tagLine"
                      placeholder="Tag Line for Article"
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
                    <option value="PC">PC</option>
                    </select>
                    </div>
                    {/* Body */}
                    <div className="form-group">
                    <label htmlFor="body">Body: </label>
                    <textarea className="form-control" 
                    required
                    name="body"
                    onChange={this.handleChange}
                    value={this.state.body}
                    />
                    {/* img */}
                    <br />
                    <div className="input-group mb-3 form-group">
                      <div className="custom-file">
                        <label class="custom-file-label upload-group" for="img">Choose file</label>
                        <input type="file" className="custom-file-input" id="img"/>
                      </div>
                      {/* <div className="input-group-append">
                        <button className="input-group-text" id="">Upload</button>
                      </div> */}
                    </div>


                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Save Article</button>
                    </div>
      
                </form>
                </div>
              </div>
            </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps){
  return {};
}

export default connect(mapStateToProps, {saveArticle})(ArticleCreator);