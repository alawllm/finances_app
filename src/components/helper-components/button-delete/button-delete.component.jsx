const ButtonDelete = ({ onClick }) => {
  return (
    <button
      className=" bg-white text-black hover:text-red-500 border-solid
       border-2 border-slate-500 rounded-full w-8 h-8 text-center"
      onClick={onClick}>
      -
    </button>
  );
};

export default ButtonDelete;
