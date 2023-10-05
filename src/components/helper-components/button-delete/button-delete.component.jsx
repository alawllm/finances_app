const ButtonDelete = ({ onClick }) => {
  return (
    <button
      className=" bg-white text-black hover:text-red-500 border-solid
       border-2 border-slate-300 rounded-full w-10 h-10 text-center"
      onClick={onClick}>
      -
    </button>
  );
};

export default ButtonDelete;
