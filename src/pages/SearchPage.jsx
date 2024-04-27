import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import CommentComponent from "../Components/CommentComponent";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .ilike("title", `%${searchTerm}%`);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setResults(data);
        // Process the search results and update the component state or render the results
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Search Results</h1>
        <p className="text-lg">
          Showing results for:{" "}
          <span className="text-green-400">{searchTerm}</span>
        </p>

        <div>
          <ul className="grid grid-cols-1 gap-8">
            {results && results.length > 0 ? (
              results.map((result, index) => {
                return (
                  <Link key={index} to={`/song/${result.id}`}>
                    <li className="bg-gray-800 rounded-lg shadow-lg">
                      <CommentComponent
                        title={result.title}
                        search={true}
                        commentId={result.id}
                      />
                    </li>
                  </Link>
                );
              })
            ) : (
              <p>No comments contain title search...</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
