# pastel-viewer

a minimal and serverless [modmail](https://github.com/modmail-dev/modmail) logviewer built with nuxt 3

## Features

- Fully serverless so you can host for free on many platforms
- Good design
- Full Discord markdown support including emojis, mentions, code blocks, timestamps, spoilers, and quote blocks
- Right-click context menus for copying messages, links, and ids
- Thread stats
- NSFW thread warning

## Planned features

- Dark theme
- Authentication

## Installation

1. Fork this repository.

2. Log in to <https://netlify.app>.

3. Go to <https://app.netlify.com/start> and select your forked repository.

4. Click `Show advanced` > `New variable` and add a new variable called `NUXT_MONGO_URI` with your Modmail's mongo URI.

5. Press deploy! You should now be able to access a log at `https://<your-site>.netlify.app/logs/<log id>`. You can also edit your Modmail's `LOG_URL` to your new url.

## Updating

To update your logviewer, simply pull the latest changes from this repository. To enable automatic updates, install [Pull](https://github.com/apps/pull) on your fork.

## Contributing

Contributions are welcome! To run the project locally, clone the repo and make a `.env` file with your Modmail's mongo URI:

```bash
NUXT_MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/
```

Then, install the dependencies with pnpm or whatever you want:

```bash
pnpm install
```

And run the project:

```bash
pnpm dev
```

## License

[MIT](https://github.com/RealCyGuy/pastel-viewer/blob/master/LICENSE)
