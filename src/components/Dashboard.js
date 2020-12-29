import React, { useState } from "react";

import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists,
} from "../actions/result";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import Header from "./Header";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("albums");

  const dispatch = useDispatch();

  const albums = useSelector((state) => state.albums);
  const artists = useSelector((state) => state.artists);
  const playlist = useSelector((state) => state.playlist);

  const { isValidSession, history } = props;
  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory("albums");
      });
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      setIsLoading(true);
      switch (type) {
        case "albums":
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case "artists":
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case "playlist":
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const result = { albums, artists, playlist };

  return isValidSession ?
  (
    <div>
      <Header />
      <SearchForm handleSearch={handleSearch} />
      <Loader show={isLoading}>Loading...</Loader>
      <SearchResult
        result={result}
        loadMore={loadMore}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
        isValidSession={isValidSession}
      />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: {
          session_expired: true
        }
      }}
    />
  );
};

export default Dashboard;
