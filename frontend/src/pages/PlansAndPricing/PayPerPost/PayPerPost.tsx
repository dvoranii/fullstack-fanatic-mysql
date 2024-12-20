import React from "react";
import {
  PayPerPostWrapper,
  PayPerPostTextWrapper,
  SwirlyImgBgWrapper,
} from "./PayPerPost.styled";
import Title from "../../../components/Title/Title";
import { Link } from "react-router-dom";

import SwirlyLineImg from "/assets/images/bg-images/swirly-line-bg.svg";

const PayPerPost: React.FC = () => {
  return (
    <PayPerPostWrapper>
      <SwirlyImgBgWrapper>
        <img src={SwirlyLineImg} className="swirly-2" alt="" />
      </SwirlyImgBgWrapper>

      <Title textContent={"Pay per post"} className="pay-per-post-title" />
      <PayPerPostTextWrapper>
        <p>
          Looking for flexibility? Only need the info from a specific tutorial
          or blog post? Then the the <b>Pay Per Post</b> option is your best
          bet, granting you access to premium content without the commitment of
          a full subscription.This allows you to curate your premium content
          collection in a more personalized way, choosing only what’s most
          relevant to your needs and interests, while keeping costs under
          control:
        </p>

        <ul>
          <li>
            <Link to="/tutorials">
              <b>Tutorials :</b>
            </Link>
            &nbsp;Dive deep into our high-quality tutorials starting from{" "}
            <b>$3</b> up to <b>$5</b>, providing you with in-depth guides and
            expert knowledge.
          </li>
          <li>
            <Link to="/blogs">
              <b>Blogs :</b>
            </Link>
            &nbsp;Access premium articles for <b>as little as $2</b>, featuring
            exclusive insights, tips, and industry updates.
          </li>
        </ul>
        <p>
          Pay Per Post is perfect if you prefer a customized learning path or
          only need specific content without a long-term commitment.
          <br></br>
          Get the knowledge you’re looking for, exactly when you need it,
          exactly the way you want it.
        </p>
      </PayPerPostTextWrapper>
    </PayPerPostWrapper>
  );
};

export default PayPerPost;
