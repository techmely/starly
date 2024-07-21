import { useSuspenseQuery } from "@tanstack/react-query";
import { withFallback } from "@techmely/vike-react";
import { navigate } from "vike/client/router";

export const Movies = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ["movies"],
      queryFn: getStarWarsMovies,
    });

    const movies = result.data;

    const onNavigate = (id: string) => {
      navigate(`/${id}`);
    };

    return (
      <>
        <h1>Star Wars Movies</h1>
        <ol>
          {movies.map(({ id, title, release_date }) => (
            <li key={id}>
              <button type="button" onClick={() => onNavigate(id)}>
                {title}
              </button>{" "}
              ({release_date})
            </li>
          ))}
        </ol>
        <p>
          Source:{" "}
          <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
        </p>
      </>
    );
  },
  { Loading: "Loading movies..." },
);

async function getStarWarsMovies(): Promise<any[]> {
  // Simulate slow network
  await new Promise((r) => setTimeout(r, 1000));

  const response = await fetch("https://star-wars.brillout.com/api/films.json");
  let movies = ((await response.json()) as any).results;
  movies = movies.map((movie, i: number) => ({
    ...movie,
    id: String(i + 1),
  }));
  return movies;
}
