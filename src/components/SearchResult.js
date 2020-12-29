import React from "react";
import _ from "lodash";
import AlbumsList from "./AlbumsList";
import ArtistsList from "./ArtistsList";
import PlayList from "./PlayList";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const SearchResult = (props) => {
  const { loadMore, result, setCategory, selectedCategory } = props;
  const { albums, artists, playlist } = result;

  if (!props.isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            session_expired: true
          }
        }}
      />
    );
  }

  return (
    <>
      <div className="search-buttons">
        {!_.isEmpty(albums.items) && (
          <button
            className={`${
              selectedCategory === "albums" ? "btn active" : "btn"
            }`}
            onClick={() => setCategory("albums")}
          >
            Albums
          </button>
        )}
        {!_.isEmpty(artists.items) && (
          <button
            className={`${
              selectedCategory === "artists" ? "btn active" : "btn"
            }`}
            onClick={() => setCategory("artists")}
          >
            Artists
          </button>
        )}
        {!_.isEmpty(playlist.items) && (
          <button
            className={`${
              selectedCategory === "playlist" ? "btn active" : "btn"
            }`}
            onClick={() => setCategory("playlist")}
          >
            PlayLists
          </button>
        )}
      </div>
      <div className={`${selectedCategory === "albums" ? "" : "hide"}`}>
        {albums && <AlbumsList albums={albums} />}
      </div>
      <div className={`${selectedCategory === "artists" ? "" : "hide"}`}>
        {artists && <ArtistsList artists={artists} />}
      </div>
      <div className={`${selectedCategory === "playlist" ? "" : "hide"}`}>
        {playlist && <PlayList playlist={playlist} />}
      </div>
      {!_.isEmpty(result[selectedCategory]) &&
        !_.isEmpty(result[selectedCategory].next) && (
          <div className="load-more" onClick={() => loadMore(selectedCategory)}>
            <Button variant="info" type="button">
              Load More
            </Button>
          </div>
        )}
    </>
  );
};
export default SearchResult;
