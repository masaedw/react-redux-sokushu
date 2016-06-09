import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from 'react-loader'

import Issue from '../lib/records/Issue'

import {
  setIssue,
  createIssue,
} from '../actions/issueNew'

import IssueNewHeader from '../components/IssueNewHeader'

import styles from './IssueNewContainer.scss'

class IssueNewContainer extends Component {

  onChangeTitle(title) {
    this.props.setIssue(this.props.issueNewManager.issue.set('title', title))
  }

  onChangeContent(content) {
    this.props.setIssue(this.props.issueNewManager.issue.set('content', content))
  }

  onCreateIssue() {
    const issueNewManager = this.props.issueNewManager
    if (!issueNewManager.loading) {
      this.props.createIssue(issueNewManager.issue)
    }
  }

  render() {
    const {issueNewManager} = this.props
    return (
      <div className={styles.base}>
        <Loader loaded={!issueNewManager.loading}>
          <Link to="/">List Page</Link>
          <IssueNewHeader
            issueNewManager={issueNewManager}
            onChangeTitle={this.onChangeTitle.bind(this)}
            onChangeContent={this.onChangeContent.bind(this)}
            onCreateIssue={this.onCreateIssue.bind(this)}
          />
        </Loader>
      </div>
    )
  }
}

IssueNewContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    issueNewManager: state.issue.issueNewManager,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setIssue,
    createIssue,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueNewContainer, styles)
