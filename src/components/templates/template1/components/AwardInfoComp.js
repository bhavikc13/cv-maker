import React, { Component, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Accordion, Card } from "react-bootstrap";
import { connect } from "react-redux";
import firestore from "./../../../../firebase/firestore";
import Loader from "./../../../loader/Loader";
import { Link } from "react-router-dom";
import AwardBlock from "./AwardBlock";

const AwardInfoComp = (props) => {
  const [state, setState] = useState({ title: "", isLoading: false });
  props.updatePrevUrl(window.location.pathname);
  const [blocks, setBlocks] = useState(props.orderOfAwardBlocks);
  useEffect(() => {
    setBlocks(props.orderOfAwardBlocks);
  }, [props.orderOfAwardBlocks]);
  useEffect(() => {
    props.updateOrderOfAwardBlocks(blocks, props.auth.uid, props.cvid);
  }, [blocks]);
  const moveBlock = (id, atIndex) => {
    const { block, index } = findBlock(id);
    setBlocks(
      update(blocks, {
        $splice: [
          [index, 1],
          [atIndex, 0, block],
        ],
      })
    );
  };
  const findBlock = (id) => {
    const block = blocks.filter((b) => b.id === id)[0];
    return {
      block,
      index: blocks.indexOf(block),
    };
  };
  const [, drop] = useDrop({ accept: "awardBlock" });

  return (
    <div ref={drop}>
      <Accordion>
        {blocks.map((block, index) => (
          <AwardBlock
            key={block.id}
            id={block.id}
            moveBlock={moveBlock}
            findBlock={findBlock}
            eventKey={index}
            cvid={props.cvid}
            index={index + 1}
          />
        ))}
      </Accordion>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
    orderOfAwardBlocks: state.orderOfAwardBlocksRed.orderOfAwardBlocks,
    orderOfBlocks: state.orderOfBlocksRed.orderOfBlocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrevUrl: (prevUrl) => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl,
      });
    },
    updateOrderOfAwardBlocks: (orderOfAwardBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_AWARD_BLOCKS",
        orderOfAwardBlocks: orderOfAwardBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AwardInfoComp);
