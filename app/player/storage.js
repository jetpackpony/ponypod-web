import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      'episode-id': null,
      position: 0,
    };
  }
});

export default Storage;
