import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Modal from 'react-modal'

import { STATE } from './../lib/records/Issue'

import styles from './IssueDetailHeader.scss'

class IssueDetailHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.issue.title,
    }
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value})
  }

  onClickTitleSave() {
    const newIssue = this.props.issue.set('title', this.state.title)
    this.props.onClickTitleSave(newIssue)
  }

  isSelectedUser(user) {
    return this.props.issue.assignee !== null && user.id === this.props.issue.assignee.id
  }

  onAssigneeSelected(user, e) {
    const newIssue = this.props.issue.set('assignee', user)
    this.props.onAssigneeSelected(newIssue)
  }

  onChangeShowUsersModal(show) {
    this.props.onChangeShowUsersModal(show)
  }

  render() {
    const { issue, issueManager, issueDetailManager } = this.props
    return (
      <div styleName="base">
        <div>
          {
            issue.status === STATE.OPEN ?
            <i className="fa fa-check-circle-o" /> :
            <i className="fa fa-times-circle-o" />
          }
          {issue.status}
        </div>
        <div styleName="title-wrapper">
          { this.props.isTitleEditing ? (<div>
              <div styleName="title">
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.onChangeTitle.bind(this)}
                />
                <div
                  styleName="edit-button"
                  onClick={this.onClickTitleSave.bind(this)}
                >
                  Save
                </div>
              </div>
            </div>) : (
            <span>
              <div styleName="title">
                {issue.title}
              </div>
              <div styleName="edit-button" onClick={this.props.onClickTitleEdit}>
                Edit
              </div>
            </span>
            )
          }
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="item-labels">
            assign
          </div>
          <div styleName="item-labels">
            labels
          </div>
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="items"
               onClick={this.onChangeShowUsersModal.bind(this, true)}
          >
            {
              issue.assignee.id ? (issue.assignee.name) : ("No Assignee")
            }
            <Modal
              isOpen={issueDetailManager.showUsersModal}
            >
              <ul>
                <li
                  onClick={this.onChangeShowUsersModal.bind(this, false)}
                >close</li>
                {
                  issueManager.users.map((user) => {
                    return (
                      <li
                        key={user.id}
                        onClick={this.onAssigneeSelected.bind(this, user)}
                      >{user.name}
                        { this.isSelectedUser(user) ? <span> selected!</span> : (null)}
                      </li>
                    )
                  })
                }
              </ul>
            </Modal>
          </div>
          <div styleName="items">
            <span>label1</span><span>label2</span>
          </div>
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="item-labels">
            created
          </div>
          <div styleName="item-labels">
            updated
          </div>
        </div>
        <div styleName="assign-label-wrapper">
          <div styleName="items">
            {issue.created}
          </div>
          <div styleName="items">
            {issue.updated}
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(IssueDetailHeader, styles)
