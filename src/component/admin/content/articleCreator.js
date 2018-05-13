import React, {Component} from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { saveArticle } from '../../../actions/articleAction';

import { connect } from 'react-redux';

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
      body: ''
    };
  
    // bind this functions

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
      const article = {
          header: this.state.header,
          tagLine: this.state.tagLine,
          articleType: this.state.articleType,
          system: this.state.system
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

                    <div className="form-group">
                    <label htmlFor="articleType">Article Type</label>
                    <select required multiple className="form-control" name="articleType" onChange={this.handleChange}>
                    <option  value="News">News</option>
                    <option  value="Review">Review</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor="system">System</label>
                    <select required multiple className="form-control" name="system" onChange={this.handleChange}>
                    <option value="PS4">PS4</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Switch">Switch</option>
                    <option value="PC">PC</option>
                    </select>
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