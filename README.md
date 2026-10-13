# Owen Peterson — Portfolio

My personal portfolio: my background, work experience, projects, and some photos. Visit it at https://owenp33.github.io/.

## How it's built

A static [Jekyll](https://jekyllrb.com/) site (Jekyll 3.10, via the `github-pages` gem) hosted on GitHub Pages, which rebuilds the site automatically on push. There's no CI config and no local Ruby install; previews run in Docker (see below). Day-to-day work happens on the `dev` branch.

| Path | What it holds |
| --- | --- |
| `index.html`, `experience.html`, `projects.html`, `media.html` | The four pages (About, Experience, Projects, Media) |
| `_layouts/default.html`, `_layouts/work.html` | Page shell (header, footer, scripts) and the template for individual work-experience pages |
| `_includes/` | Header, footer, and reusable cards (projects, documents, photos, roles) |
| `_data/` | The site's content (see below) |
| `_work/` | One Markdown file per job, each with its own page under `/experience/` |
| `assets/css/`, `assets/js/` | Styles per page, plus small scripts for the nav underline, photo viewer, PDF previews, and course tooltips |
| `assets/images/`, `assets/documents/`, `assets/fonts/` | Photos, project thumbnails, PDFs/posters, and the Ranade font |

## Updating content

Most changes are edits to a data file, not the page HTML.

- **Projects:** `_data/projects.yml`. Each project has a `title`, `category` (each category becomes a heading on the Projects page), and `subtitle`. `image` is the thumbnail (without one the card shows an icon), and `url` makes the card a link. Set `featured: true` to also show it on the About page.
- **Photos:** add the image to `assets/images/gallery/`, then add a `file` (exact filename, including capitalization) and `caption` to `_data/media.yml`. The caption appears when the photo is opened, and is also its alt text. Set `featured: true` to show it on the About page. Remove an entry to take the photo off the site.
- **Documents:** add the file to `assets/documents/`, then an entry to `_data/documents.yml`. `type: pdf` shows a first-page preview; `type: image` shows the image itself.
- **Education and honors:** `_data/experience.yml`. The Significant Coursework list is written directly in `experience.html`.
- **Work experience:** one file per role in `_work/`. The top block holds `title`, `org`, `dates`, and `order` (position in the list); everything below it is that role's page. Its card on the Experience page links there only when `linked: true`, so pages can be drafted without being reachable.
- **About text and tags:** `index.html`.

## Local preview (Docker)

Run these in **PowerShell** from the repo root. Git Bash rewrites the `/srv/jekyll` path and breaks the mount.

**First time only:** create a volume for the gems, then create the preview container.

```
docker volume create owen-portfolio-bundle
docker run -d --name owen-portfolio-preview -v owen-portfolio-bundle:/usr/local/bundle -v "${PWD}:/srv/jekyll" -p 4000:4000 -p 35729:35729 jekyll/jekyll bash -lc "bundle install && bundle exec jekyll serve --host 0.0.0.0 --livereload --livereload-port 35729 --force_polling"
```

**After that:** open Docker Desktop, start the container, and visit http://localhost:4000.

```
docker start owen-portfolio-preview
```

The first start installs gems and takes a few minutes; later starts take about 30 seconds. Saved changes rebuild in a few seconds and the open page reloads itself. Changes to `_config.yml` only apply after `docker restart owen-portfolio-preview`, and after a restart you need to refresh the page once.

Why it's set up this way:

- **Gems in a named volume**, not the repo folder: installing ~100 gems through a Windows folder mount is slow enough to look like a hang.
- **`bundle exec jekyll`**, not plain `jekyll`: the image's built-in Jekyll is a different version from the one the `Gemfile` pins.
- **`--force_polling`**: Windows folder mounts don't pass file-change events into the container, so Jekyll checks for changes instead.
- **No caching in the preview**: `_config.yml` tells the preview server to send `Cache-Control: no-store`, and the layout adds a version number to every local CSS/JS link, so browsers never show stale styles.

### Troubleshooting

- **"Virtualization is disabled in firmware"** when starting Docker: turn on CPU virtualization in the BIOS. It's called *SVM Mode* on AMD boards and *Intel Virtualization Technology (VT-x)* on Intel ones. A BIOS update or settings reset can turn it back off.
- **The site stopped responding:** check `docker ps -a`. If the container shows `Exited`, run `docker start owen-portfolio-preview`.
- **Docker reports a WSL error:** run `wsl --update`, then restart Docker Desktop.
