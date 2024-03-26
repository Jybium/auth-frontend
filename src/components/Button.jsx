export const SecondaryButton = (props) => {
  const classes = `py-[9px]  px-10 md:px-4 lg:px-10 border-[1px] bg-white text-[#008700] border-[#008700] hover:border-[#003800] text-[12px] rounded ${props.className}`;

  return (
    <button type={props.type} className={classes}>
      {props.title}
      {/* <span></span> */}
    </button>
  );
};
