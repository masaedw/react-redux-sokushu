import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import nl2br from '../lib/utils/nl2br'

import styles from './IssueCommentListItem.scss'

class IssueCommentListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editingContent: this.props.comment.content,
    }
  }

  onClickEdit() {
    this.setState({ isEditing: true })
  }

  onClickCancel() {
    this.setState({ isEditing: false })
  }

  onClickSave() {
    this.setState({ isEditing: false })
    const newComment = this.props.comment.set('content', this.state.editingContent)
    this.props.onClickSave(newComment)
  }

  onClickDelete() {
    console.log("onclickdelete")
    this.props.onClickDelete(this.props.comment)
  }

  onChangeContent(e) {
    this.setState({ editingContent: e.target.value })
  }

  render() {
    const { comment } = this.props

    return (
      <div styleName="base">
        <div styleName="header">
          <div styleName="header-name">
            {comment.userName}
          </div>
          <div styleName="header-date">
            {comment.updated}
          </div>
          <div
            styleName="header-icon"
            onClick={this.onClickEdit.bind(this)}
          >
            <i className="fa fa-pencil" />
          </div>
          <div
            styleName="header-icon"
            onClick={this.onClickDelete.bind(this)}
          >
            <i className="fa fa-trash" />
          </div>
        </div>
        <div styleName="main">
          { this.state.isEditing ? (
              <div>
                <textarea
                  value={this.state.editingContent}
                  onChange={this.onChangeContent.bind(this)}
                />
                <div styleName="buttons">
                  <div
                    styleName="comment-button"
                    onClick={this.onClickSave.bind(this)}
                  >
                    Save
                  </div>
                  <div
                    styleName="cancel-button"
                    onClick={this.onClickCancel.bind(this)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            ) : (
              nl2br(comment.content)
            )
          }
        </div>
      </div>
    )
  }
}

export default CSSModules(IssueCommentListItem, styles)
