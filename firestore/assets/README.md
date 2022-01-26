# Firestore assets

Some data cannot be imported into the Firestore Emulators automatically.

## Product images

The product documents contain a path to an image inside the Firebase Storage. These images must be uploaded manually:

1. Create these folders inside the `coffeekass.appspot.com` storage bucket:

```
product/coffee
product/mate
product/water
```

2. Upload the images from the folder `firestore/assets/images` to their respective folder.

## User avatars

If you would like a `Person` to have an avatar image the related person document must have a field name `image` that points to the image path inside the Storage bucket. Just like with the products.
