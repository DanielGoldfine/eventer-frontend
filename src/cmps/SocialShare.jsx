import React, { Component } from 'react'
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton
} from "react-share"


export class SocialShare extends Component {

  render() {
    const shareUrl = 'http://localhost:3000/event/' + this.props.eventId
    const title = 'Check this amazing event ' + this.props.eventTitle
    return (
      <div className="social-share flex space-around align-items justify-center">
        <h3 className="align-self-center">Invite your friends</h3>
        <div className="share-icon">
          <TwitterShareButton
            url={shareUrl}
            title={title}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="share-icon">
          <TelegramShareButton
            url={shareUrl}
            title={title}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
        <div className="share-icon">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        <div className="share-icon">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>
    )
  }
}
