import React from "react";
 // You can add styling for individual gem items here

const PostCutGem = ({ postCutGem }) => {
  return (
    <div className="postcut-gem">
      <h3>{postCutGem.gemType}</h3>
      <p>Cut Type: {postCutGem.cutType}</p>
      <p>Weight: {postCutGem.weight} g</p>
      <p>Polish: {postCutGem.polish}</p>
      <p>price: {postCutGem.price}</p>
      <p>discription: {postCutGem.discription}</p>
    </div>
  );
};

export default PostCutGem;
