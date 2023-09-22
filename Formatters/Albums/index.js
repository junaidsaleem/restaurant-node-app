const AlbumsFormatter = (album) => {
  const { _id, name, topic, photos } = album;

  return {
    id: _id.toString(),
    name,
    topic,
    photos,
  };
};

module.exports = AlbumsFormatter;
