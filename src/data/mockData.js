export const VENUE = {
  id:         'barca-cafe-uuid',
  slug:       'barca-cafe',
  name:       'Barca Café',
  location:   'Karaköy, İstanbul',
  tableLabel: 'Masa 7',
}

export const NOW_PLAYING = {
  id:            'np-1',
  spotifyId:     '4iV5W9uYEdYUVa79Axb7Rh',
  title:         'Blinding Lights',
  artist:        'The Weeknd',
  album:         'After Hours',
  albumArt:      'https://picsum.photos/seed/jkly_np/300/300',
  durationMs:    200000,
  progressMs:    87000,
}

export const INITIAL_QUEUE = [
  {
    id: 'q1', position: 1,
    spotifyId: '0VjIjW4GlUZAMYd2vXMi3b',
    title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line',
    albumArt: 'https://picsum.photos/seed/jkly_q1/300/300',
    durationMs: 174000, isMine: true,
  },
  {
    id: 'q2', position: 2,
    spotifyId: '7qiZfU4dY1lWllzX7mPBI3',
    title: 'Shape of You', artist: 'Ed Sheeran', album: '÷',
    albumArt: 'https://picsum.photos/seed/jkly_q2/300/300',
    durationMs: 234000, isMine: false,
  },
  {
    id: 'q3', position: 3,
    spotifyId: '3n3Ppam7vgaVa1iaRUIOKE',
    title: 'Happy', artist: 'Pharrell Williams', album: 'G I R L',
    albumArt: 'https://picsum.photos/seed/jkly_q3/300/300',
    durationMs: 233000, isMine: false,
  },
  {
    id: 'q4', position: 4,
    spotifyId: '6habFhsOp2NvshLv26DqMb',
    title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia',
    albumArt: 'https://picsum.photos/seed/jkly_q4/300/300',
    durationMs: 203000, isMine: false,
  },
]

// Full catalog for search
export const SONG_CATALOG = [
  // ── Turkish
  { id: 's01', spotifyId: 'tr01', title: 'Şımarık', artist: 'Tarkan', album: 'Ölürüm Sana', albumArt: 'https://picsum.photos/seed/jkly_s01/300/300', durationMs: 234000 },
  { id: 's02', spotifyId: 'tr02', title: 'Para Para', artist: 'Tarkan', album: 'Karma', albumArt: 'https://picsum.photos/seed/jkly_s02/300/300', durationMs: 219000 },
  { id: 's03', spotifyId: 'tr03', title: 'Unuttun mu', artist: 'Sertab Erener', album: 'Sertab', albumArt: 'https://picsum.photos/seed/jkly_s03/300/300', durationMs: 248000 },
  { id: 's04', spotifyId: 'tr04', title: 'Her Şey Seninle Güzel', artist: 'Duman', album: 'Duman 2', albumArt: 'https://picsum.photos/seed/jkly_s04/300/300', durationMs: 267000 },
  { id: 's05', spotifyId: 'tr05', title: 'Olmaz Olsun', artist: 'Mabel Matiz', album: 'Benden Büyük Parti', albumArt: 'https://picsum.photos/seed/jkly_s05/300/300', durationMs: 198000 },
  { id: 's06', spotifyId: 'tr06', title: 'Gül Pembe', artist: 'Zeki Müren', album: 'Klasikler', albumArt: 'https://picsum.photos/seed/jkly_s06/300/300', durationMs: 312000 },
  { id: 's07', spotifyId: 'tr07', title: 'Yok Böyle Bir Şey', artist: 'Manga', album: 'Şehr-i Hüzün', albumArt: 'https://picsum.photos/seed/jkly_s07/300/300', durationMs: 224000 },
  { id: 's08', spotifyId: 'tr08', title: 'Senden Daha Güzel', artist: 'Sertap Erener', album: 'Sertab', albumArt: 'https://picsum.photos/seed/jkly_s08/300/300', durationMs: 241000 },

  // ── Pop / Dance
  { id: 's09', spotifyId: 'int01', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', albumArt: 'https://picsum.photos/seed/jkly_s09/300/300', durationMs: 200000 },
  { id: 's10', spotifyId: 'int02', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', albumArt: 'https://picsum.photos/seed/jkly_s10/300/300', durationMs: 203000 },
  { id: 's11', spotifyId: 'int03', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', albumArt: 'https://picsum.photos/seed/jkly_s11/300/300', durationMs: 174000 },
  { id: 's12', spotifyId: 'int04', title: 'good 4 u', artist: 'Olivia Rodrigo', album: 'SOUR', albumArt: 'https://picsum.photos/seed/jkly_s12/300/300', durationMs: 178000 },
  { id: 's13', spotifyId: 'int05', title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', albumArt: 'https://picsum.photos/seed/jkly_s13/300/300', durationMs: 234000 },
  { id: 's14', spotifyId: 'int06', title: 'Stay', artist: 'Justin Bieber & Kid LAROI', album: 'Stay', albumArt: 'https://picsum.photos/seed/jkly_s14/300/300', durationMs: 141000 },
  { id: 's15', spotifyId: 'int07', title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP', albumArt: 'https://picsum.photos/seed/jkly_s15/300/300', durationMs: 194000 },
  { id: 's16', spotifyId: 'int08', title: 'Say So', artist: 'Doja Cat', album: 'Hot Pink', albumArt: 'https://picsum.photos/seed/jkly_s16/300/300', durationMs: 238000 },
  { id: 's17', spotifyId: 'int09', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', albumArt: 'https://picsum.photos/seed/jkly_s17/300/300', durationMs: 270000 },
  { id: 's18', spotifyId: 'int10', title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', albumArt: 'https://picsum.photos/seed/jkly_s18/300/300', durationMs: 198000 },

  // ── Indie / Alternative
  { id: 's19', spotifyId: 'alt01', title: 'Mr. Brightside', artist: 'The Killers', album: 'Hot Fuss', albumArt: 'https://picsum.photos/seed/jkly_s19/300/300', durationMs: 222000 },
  { id: 's20', spotifyId: 'alt02', title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', album: 'AM', albumArt: 'https://picsum.photos/seed/jkly_s20/300/300', durationMs: 272000 },
  { id: 's21', spotifyId: 'alt03', title: 'The Less I Know The Better', artist: 'Tame Impala', album: 'Currents', albumArt: 'https://picsum.photos/seed/jkly_s21/300/300', durationMs: 216000 },
  { id: 's22', spotifyId: 'alt04', title: 'Yellow', artist: 'Coldplay', album: 'Parachutes', albumArt: 'https://picsum.photos/seed/jkly_s22/300/300', durationMs: 269000 },
  { id: 's23', spotifyId: 'alt05', title: 'Creep', artist: 'Radiohead', album: 'Pablo Honey', albumArt: 'https://picsum.photos/seed/jkly_s23/300/300', durationMs: 238000 },
  { id: 's24', spotifyId: 'alt06', title: 'Somebody That I Used to Know', artist: 'Gotye', album: 'Making Mirrors', albumArt: 'https://picsum.photos/seed/jkly_s24/300/300', durationMs: 244000 },

  // ── R&B / Soul
  { id: 's25', spotifyId: 'rnb01', title: 'Valerie', artist: 'Amy Winehouse', album: 'B-Sides', albumArt: 'https://picsum.photos/seed/jkly_s25/300/300', durationMs: 232000 },
  { id: 's26', spotifyId: 'rnb02', title: 'Stay With Me', artist: 'Sam Smith', album: 'In the Lonely Hour', albumArt: 'https://picsum.photos/seed/jkly_s26/300/300', durationMs: 172000 },
  { id: 's27', spotifyId: 'rnb03', title: 'One Dance', artist: 'Drake', album: 'Views', albumArt: 'https://picsum.photos/seed/jkly_s27/300/300', durationMs: 173000 },
  { id: 's28', spotifyId: 'rnb04', title: 'Human', artist: "Rag'n'Bone Man", album: 'Human', albumArt: 'https://picsum.photos/seed/jkly_s28/300/300', durationMs: 258000 },
  { id: 's29', spotifyId: 'rnb05', title: 'Circles', artist: 'Post Malone', album: "Hollywood's Bleeding", albumArt: 'https://picsum.photos/seed/jkly_s29/300/300', durationMs: 215000 },
  { id: 's30', spotifyId: 'rnb06', title: 'Happy', artist: 'Pharrell Williams', album: 'G I R L', albumArt: 'https://picsum.photos/seed/jkly_s30/300/300', durationMs: 233000 },
]
