import Image from "next/image";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const PlayComponent = dynamic(
  () => import("./components/PlayComponent"),
  {
    ssr: false,
  }
);
 const PublishComponent = dynamic(
  () => import("./components/PublishComponent"),
  {
    ssr: false,
  }
);
 
export default function Home() {
  return (
    <div >
      <main style={{display:"flex",flexDirection:"column"}}>
       <h1 style={{marginTop:"1rem",marginLeft:"auto",marginRight:"auto"}}>Ant Media NextJS Sample</h1> 

        <div style={{display:"flex",marginTop:"2rem",justifyContent:"space-between"}}>
        <div style={{marginLeft:"3rem"}}>
         <PublishComponent>

        </PublishComponent> 
        </div>

        <div style={{marginRight:"3rem"}}>
        <PlayComponent>


        </PlayComponent>
        </div>

    






        </div>



      </main>
    </div>
  );
}
