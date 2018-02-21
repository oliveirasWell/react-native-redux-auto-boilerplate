const images = [
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/03-best-17-gelada-baboons-monkeys-guassa-ethiopia-evening-running-cliffs.adapt.1900.1.jpg?alt=media&token=addd8c01-5480-4d3d-b7a9-af8211e19c1c',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/11-best-01-making-massacre.adapt.1900.1.jpg?alt=media&token=15936483-abcc-4dd6-ac28-60e46ff3eb26',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/800px_COLOURBOX3281500.jpg?alt=media&token=2b542779-6baa-477c-9a9a-f3ff3c1c2a1d',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/anupam-nath-india-elephant-top-100-photos-2017.jpg?alt=media&token=31446c0a-6917-4d59-a896-ff3095cdc040',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/phil-moore-south-sudan-top-100-photos-2017-1.jpg?alt=media&token=c3ad2884-3b39-4330-9ae6-af11620e0747',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/tess.jpg?alt=media&token=7da5dc48-28f5-4285-b1d0-c7f38c00ef0d',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/ulet-ifansasti-indonesia-independence-top-100-photos-2017.jpg?alt=media&token=040239df-7979-407e-8d91-cb86c6cd40cf',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/ulises-ruiz-basurto-mexico-volcano-top-100-photos-2017.jpg?alt=media&token=29efd569-ee6e-4902-abbe-718923eaf3bf',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/01-diy-christmas-lights-decoration-ideas-homebnc.jpg?alt=media&token=c3c55df3-a3c9-43c5-acec-af54dc01177e'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/15_macro_ideas_06.jpg?alt=media&token=d4ded22a-e327-40cf-a0f6-245a3735c28f'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/15_macro_ideas_10.jpg?alt=media&token=c43b54b6-e4e3-46b3-b129-ce1765d0b61f'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/15_macro_ideas_141.jpg?alt=media&token=97822a68-5d16-43bb-a567-6d6a6195c194'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3478.jpg?alt=media&token=798aa220-4b03-450b-a7bb-2ca77e028009'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3599.jpg?alt=media&token=f02253a8-b212-41f6-bf70-045b197314c7'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3812.jpg?alt=media&token=27e03304-a770-4785-a786-db8c803aad2b'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3991.jpg?alt=media&token=1e7e56ac-22f8-4ae8-b3f4-77a0dc91b82a'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/27971804_10155274361581220_5883865297652032502_n.jpg?alt=media&token=8ba67f13-4a78-4d49-af8b-9ca37e65af93'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/800px_COLOURBOX3281500.jpg?alt=media&token=2b542779-6baa-477c-9a9a-f3ff3c1c2a1d'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/adrian-kraus-national-anthem-top-100-photos-2017.jpg?alt=media&token=ae305f3b-3af3-4663-8786-91b72e4b2f29'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/closeup-yarn-trash.jpeg?alt=media&token=1d7b4213-10af-44dc-bf07-d48f9e6ce5ca'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/decorative_accs_hero_180917.jpg?alt=media&token=65678ac3-01d2-4cd4-a11f-d2f22c33a371'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/dream-wedding-photography-creative-wedding-decoration-kisiye-ozel-siradisi-dugun-fotograflari.jpg?alt=media&token=3ca11bc3-aae3-4525-bd0f-37966ec0cb68'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/Interior_Photography_GK113.jpg?alt=media&token=aaac9606-5bdf-4e2d-9345-b08a558cf0fb'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/reflective-macro-6603.jpg?alt=media&token=cf4c124a-5994-4ff8-8313-fb6d5ab41736'
];


export const getRandomImage = () => {
    return images[Math.floor(Math.random() * (images.length - 1))];
};