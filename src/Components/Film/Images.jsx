import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Images() {

    const [images, setImages] = useState({})
    const urlPararms = useParams();

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${urlPararms.id}?api_key=017864b5160abacb16620d2413135901&append_to_response=videos,images`
        )
        .then(response => response.json())
        .then(json => setImages(json))
    }, [urlPararms, setImages])
    console.log(images)

  return (
      <div className="images-container">
        <section className="posters-box">
          <h2>Posters</h2>
        </section>
        <section className="backdrops-box">
          <h2>Backdrops</h2>
        </section>
        <section className="logos-box">
          <h2>Logos</h2>
        </section>
      </div>
  );
}
