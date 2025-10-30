import { Candy,EllipsisVertical,X  } from "lucide-react";


export default function Icon ({name, size = 20, color = "currentColor" }){
    const icons ={
        logo : <Candy  size={size} color={color}/>,
        menu : <EllipsisVertical size={size} color={color} />,
        batal : <X  size={size} color={color}/>
    }
    return icons[name] || null;
}