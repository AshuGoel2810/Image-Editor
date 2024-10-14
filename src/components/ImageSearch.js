// src/components/ImageSearch.js
import React, { useState } from 'react';
import { createClient } from 'pexels';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ImageSearch = ({ onSelectImage }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const client = createClient('z4E52xP6aDygYlRCK5yEyLjGc7JQvsioe8z0p6NHGjkavywCYM1T2MkI');

    const handleSearch = async () => {
        if (!query.trim()) {
            alert('Please enter a valid search term');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const photos = await client.photos.search({ query, per_page: 20 });
            setResults(photos.photos);
        } catch (error) {
            console.error('Error fetching images', error);
            setError('Failed to fetch images. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const options = {
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 },
        },
    };

    return (
        <div className='container mt-4 border p-4 rounded'>
            <div>
                <span className='fw-bold'>Name: </span>Ashu Goel
            </div>
            <p>
                <span className='fw-bold'>E-mail Id: </span>ashugoel77777@gmail.com
            </p>

            <div className="d-flex justify-content-center mb-3 pt-5">
                <div className="input-group seach-style">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for images"
                        className="form-control"
                    />
                    <button onClick={handleSearch} className="btn btn-primary">Search</button>
                </div>
            </div>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="image-results">
                {results.length > 0 && !loading ? (
                    <OwlCarousel className="owl-theme" {...options}>
                        {results.slice().map((image) => (
                            <div className="item" key={image.id}>
                                <img
                                    src={image.src.medium}
                                    alt={image.alt}
                                    className="d-block w-100"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <div className="text-center mt-2">
                                    <button onClick={() => onSelectImage(image.src.large)} className="btn btn-primary col-7">Add Captions</button>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                ) : (
                    !loading && (
                        <p className='d-flex justify-content-center py-3'>No images found. Try a different search query.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default ImageSearch;
