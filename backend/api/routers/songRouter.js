const express = require('express');
const songCon = require('../controllers/songCon')
const router = express.Router();

router.post('/songs/import',songCon.addSong)
router.get('/songs',songCon.getAllSongs)
router.post('/song/select',songCon.songSelect)
router.post('/song/title',songCon.getSongByTitle)
router.post('/song/artist',songCon.getSongByArtist)
router.post('/song/album',songCon.getSongByAlbum)
router.delete('/songs',songCon.deleteSong)
router.put('/songs/:id',songCon.updateSong)

module.exports = router