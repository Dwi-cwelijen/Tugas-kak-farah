export default function Button ({onClick,text,variant,className,type}) {
    const style = {
        simpan: "text-white bg-sky-400 hover:bg-sky-950",
        edit : "text-white bg-yellow-300 hover:bg-yellow-500",
        hapus : "text-white bg-red-600 hover:bg-red-900",
        tambah : "text-white  bg-sky-950 hover:bg-white hover:text-black shadow-lg font-bold"
        

    };
    return (
        <button type={type}
        onClick={onClick} className={`px-4 py-1 md:py-2 rounded-lg font-medium transition ${style[variant]} ${className}`}>
            {text}
        </button>

        
    );
}