# Description of my website

Here is my portfolio website to display some of my background and experience thus far. This contains information ranging from personal interests to coursework to projects I've done over the years. Here's a link directly to my website if you're interested in learning more about me! https://owenp33.github.io/

## Development

Built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages, which builds the site automatically on push &mdash; no local Ruby install or CI config needed.

- `_layouts/`, `_includes/` &mdash; shared page layout, header, and footer templates
- `_data/projects.yml`, `_data/media.yml` &mdash; project and photo entries, rendered on both their full pages and as featured previews on the About page
- `assets/` &mdash; CSS, JS, images, and fonts

### Local preview (Docker, no Ruby install required)

Gems are cached in a named Docker volume (`owen-portfolio-bundle`) rather than bind-mounted into the repo &mdash; on Windows, installing/loading ~100 gems through a bind mount is slow enough to look like a hang. Create the volume once:

```
docker volume create owen-portfolio-bundle
```

Then, from the repo root:

```
docker run --rm -it -v owen-portfolio-bundle:/usr/local/bundle -v "${PWD}:/srv/jekyll" -p 4000:4000 jekyll/jekyll:latest bash -lc "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

Then open http://localhost:4000. The first run installs gems into the volume, so it takes a bit longer than later runs. Use `bundle exec` (not plain `jekyll`) &mdash; the image ships its own global Jekyll that otherwise conflicts with the version pinned by the `Gemfile`.
