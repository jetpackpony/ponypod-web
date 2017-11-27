import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      lastPlayingId: null,
      episodes: {}
    };
  }
});

export default Storage;
