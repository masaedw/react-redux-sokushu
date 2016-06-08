import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import Comment from '../lib/records/Comment'

import styles from './IssueCommentForm.scss'

class IssueCommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      content: '',
    }
  }

  onClickComment() {
    console.log("this.state", this.state)
    const comment = Comment.fromJS(this.state)
    this.props.onClickComment(comment)
  }

  onChangeUserName(e) {
    this.setState({userName: e.target.value})
  }

  onChangeContent(e) {
    this.setState({content: e.target.value})
  }

  render() {
    return (
      <div styleName="base">
        <div styleName="header">
          <span styleName="input-label">
            User Name
          </span>
          <span styleName="user-input">
            <input
              type="text"
              value={this.state.userName}
              onChange={this.onChangeUserName.bind(this)}
            />
          </span>
        </div>
        <div styleName="main">
          <div styleName="input-label">
            Comment Here
          </div>
          <textarea
            styleName="comment-text"
            value={this.state.editingContent}
            onChange={this.onChangeContent.bind(this)}
          />
        </div>
        <div styleName="footer">
          <div styleName="close-issue-button">
            Close Issue
          </div>
          <div
            styleName="comment-button"
            onClick={this.onClickComment.bind(this)}
          >
            Comment
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(IssueCommentForm, styles)
