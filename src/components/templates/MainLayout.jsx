
import Header from "../organisms/Header";

export default function Main ({children}){
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}