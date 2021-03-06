import React, { Component, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Accordion, Card } from "react-bootstrap";
import { connect } from "react-redux";
import firestore from "./../../../../firebase/firestore";
import Loader from "./../../../loader/Loader";
import { Link } from "react-router-dom";
import PositionBlock from "./PositionBlock";

const PositionInfoComp = (props) => {
  const [state, setState] = useState({ title: "", isLoading: false });
  props.updatePrevUrl(window.location.pathname);
  const [blocks, setBlocks] = useState(props.orderOfPositionBlocks);
  useEffect(() => {
    setBlocks(props.orderOfPositionBlocks);
  }, [props.orderOfPositionBlocks]);
  useEffect(() => {
    props.updateOrderOfPositionBlocks(blocks, props.auth.uid, props.cvid);
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
  const [, drop] = useDrop({ accept: "positionBlock" });

  return (
    <div ref={drop}>
      <Accordion>
        {blocks.map((block, index) => (
          <PositionBlock
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
    orderOfPositionBlocks: state.orderOfPositionBlocksRed.orderOfPositionBlocks,
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
    updateOrderOfPositionBlocks: (orderOfPositionBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_POSITION_BLOCKS",
        orderOfPositionBlocks: orderOfPositionBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionInfoComp);
