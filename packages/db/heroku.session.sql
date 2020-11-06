SELECT products.title,
  products.title_original,
  products.price,
  products.synopsis,
  products.production_year,
  products.created_at,
  products.ean,
  products.image_url,
  availabilities.name "availability",
  stock_statuses.name "stock status",
  publishers.name "publisher",
  distributors.name "distributor",
  age_ratings.name "age rating",
  media_types.name "media type",
  STRING_AGG(DISTINCT countries.name, ';') "countries",
  STRING_AGG(DISTINCT authors.name, ';') "authors",
  videos.bonus_content "Bonus content",
  videos.minutes "Minutes",
  video_zones.name "DVD ZONE",
  video_categories.name "Category",
  tv_formats.name "TV Format",
  film_formats.name "Film Format",
  STRING_AGG(DISTINCT actors.name, ';') "Actors",
  STRING_AGG(DISTINCT audio_tracks.name, ';') "Audio Tracks",
  STRING_AGG(DISTINCT subcategories.name, ';') "Subcategories",
  STRING_AGG(DISTINCT genres.name, ';') "Genres",
  STRING_AGG(DISTINCT subtitles.name, ';') "Subtitles",
  STRING_AGG(DISTINCT collections.name, ';') "Collections"
FROM products
  LEFT JOIN publishers ON publishers.id_publisher = products.id_publisher
  LEFT JOIN availabilities ON availabilities.id_availability = products.id_availability
  LEFT JOIN distributors ON distributors.id_distributor = products.id_distributor
  JOIN age_ratings ON age_ratings.id_age_rating = products.id_age_rating
  JOIN stock_statuses ON stock_statuses.id_stock_status = products.id_stock_status
  JOIN media_types ON media_types.id_media_type = products.id_media_type
  JOIN product_countries ON product_countries.id_pco_product = products.id_product
  JOIN countries ON countries.id_country = product_countries.id_pco_country
  JOIN product_authors ON products.id_product = product_authors.id_pau_product
  JOIN authors ON authors.id_author = product_authors.id_pau_author
  JOIN videos ON videos.id_video = products.id_video
  JOIN video_zones ON video_zones.id_video_zone = videos.id_zone
  JOIN video_categories ON video_categories.id_video_category = videos.id_category
  JOIN film_formats ON film_formats.id_film_format = videos.id_film_format
  JOIN tv_formats ON tv_formats.id_tv_format = videos.id_tv_format
  LEFT JOIN video_actors ON video_actors.id_vac_video = videos.id_video
  LEFT JOIN actors ON video_actors.id_vac_actor = actors.id_actor
  LEFT JOIN video_audio ON video_audio.id_vau_video = videos.id_video
  LEFT JOIN audio_tracks ON audio_tracks.id_audio_track = video_audio.id_vau_audio_track
  LEFT JOIN video_subcategories ON video_subcategories.id_vsc_video = videos.id_video
  LEFT JOIN subcategories ON subcategories.id_subcategory = video_subcategories.id_vsc_subcategory
  LEFT JOIN video_genres ON video_genres.id_vge_video = videos.id_video
  LEFT JOIN genres ON genres.id_genre = video_genres.id_vge_genre
  LEFT JOIN video_subtitles ON video_subtitles.id_vst_video = videos.id_video
  LEFT JOIN subtitles ON subtitles.id_subtitle = video_subtitles.id_vst_subtitle
  LEFT JOIN video_collections ON video_collections.id_vco_video = videos.id_video
  LEFT JOIN collections ON collections.id_collection = video_collections.id_vco_collection
WHERE products.id_product = 11
GROUP BY products.title,
  products.title_original,
  products.price,
  products.synopsis,
  products.production_year,
  products.created_at,
  products.ean,
  products.image_url,
  availabilities.name,
  stock_statuses.name,
  age_ratings.name,
  media_types.name,
  publishers.name,
  distributors.name,
  videos.minutes,
  film_formats.name,
  video_zones.name,
  video_categories.name,
  tv_formats.name,
  videos.id_video;

SELECT videos.bonus_content "Bonus content",
  videos.minutes "Minutes",
  video_zones.name "DVD ZONE",
  video_categories.name "Category",
  tv_formats.name "TV Format",
  film_formats.name "Film Format",
  STRING_AGG(DISTINCT actors.name, ';') "Actors",
  STRING_AGG(DISTINCT audio_tracks.name, ';') "Audio Tracks",
  STRING_AGG(DISTINCT subcategories.name, ';') "Subcategories",
  STRING_AGG(DISTINCT genres.name, ';') "Genres",
  STRING_AGG(DISTINCT subtitles.name, ';') "Subtitles",
  STRING_AGG(DISTINCT collections.name, ';') "Collections"
FROM videos
  JOIN video_zones ON video_zones.id_video_zone = videos.id_zone
  JOIN video_categories ON video_categories.id_video_category = videos.id_category
  JOIN film_formats ON film_formats.id_film_format = videos.id_film_format
  JOIN tv_formats ON tv_formats.id_tv_format = videos.id_tv_format
  LEFT JOIN video_actors ON video_actors.id_vac_video = videos.id_video
  LEFT JOIN actors ON video_actors.id_vac_actor = actors.id_actor
  LEFT JOIN video_audio ON video_audio.id_vau_video = videos.id_video
  LEFT JOIN audio_tracks ON audio_tracks.id_audio_track = video_audio.id_vau_audio_track
  LEFT JOIN video_subcategories ON video_subcategories.id_vsc_video = videos.id_video
  LEFT JOIN subcategories ON subcategories.id_subcategory = video_subcategories.id_vsc_subcategory
  LEFT JOIN video_genres ON video_genres.id_vge_video = videos.id_video
  LEFT JOIN genres ON genres.id_genre = video_genres.id_vge_genre
  LEFT JOIN video_subtitles ON video_subtitles.id_vst_video = videos.id_video
  LEFT JOIN subtitles ON subtitles.id_subtitle = video_subtitles.id_vst_subtitle
  LEFT JOIN video_collections ON video_collections.id_vco_video = videos.id_video
  LEFT JOIN collections ON collections.id_collection = video_collections.id_vco_collection
WHERE videos.id_video = 23
GROUP BY videos.bonus_content,
  videos.minutes,
  film_formats.name,
  video_zones.name,
  video_categories.name,
  tv_formats.name;

-- SELECT STRING_AGG(DISTINCT collections.name, ';') "Collections",
--   videos.bonus_content "Bonus content",
--   videos.minutes "Minutes",
--   video_zones.name "DVD ZONE",
--   video_categories.name "Category",
--   tv_formats.name "TV Format",
--   film_formats.name "Film Format",
--   STRING_AGG(DISTINCT actors.name, ';') "Actors",
--   STRING_AGG(DISTINCT audio_tracks.name, ';') "Audio Tracks",
--   STRING_AGG(DISTINCT subcategories.name, ';') "Subcategories",
--   STRING_AGG(DISTINCT genres.name, ';') "Genres",
--   STRING_AGG(DISTINCT subtitles.name, ';') "Subtitles"
-- FROM videos
--   JOIN video_zones ON video_zones.id_video_zone = videos.id_zone
--   JOIN video_categories ON video_categories.id_video_category = videos.id_category
--   JOIN film_formats ON film_formats.id_film_format = videos.id_film_format
--   JOIN tv_formats ON tv_formats.id_tv_format = videos.id_tv_format
--   LEFT JOIN video_actors ON video_actors.id_vac_video = videos.id_video
--   LEFT JOIN actors ON video_actors.id_vac_actor = actors.id_actor
--   LEFT JOIN video_audio ON video_audio.id_vau_video = videos.id_video
--   LEFT JOIN audio_tracks ON audio_tracks.id_audio_track = video_audio.id_vau_audio_track
--   LEFT JOIN video_subcategories ON video_subcategories.id_vsc_video = videos.id_video
--   LEFT JOIN subcategories ON subcategories.id_subcategory = video_subcategories.id_vsc_subcategory
--   LEFT JOIN video_genres ON video_genres.id_vge_video = videos.id_video
--   LEFT JOIN genres ON genres.id_genre = video_genres.id_vge_genre
--   LEFT JOIN video_subtitles ON video_subtitles.id_vst_video = videos.id_video
--   LEFT JOIN subtitles ON subtitles.id_subtitle = video_subtitles.id_vst_subtitle
--   LEFT JOIN video_collections ON video_collections.id_vco_video = videos.id_video
--   LEFT JOIN collections ON collections.id_collection = video_collections.id_vco_collection
-- WHERE videos.id_video = 23
-- GROUP BY videos.bonus_content,
--   videos.minutes,
--   film_formats.name,
--   video_zones.name,
--   video_categories.name,
--   tv_formats.name;