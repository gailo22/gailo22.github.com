# How to Create a New Page and Deploy

## Prerequisites

- Hugo installed (`brew install hugo`)
- Go installed (`brew install go`) — required by the Hextra theme
- Git access to this repo

---

## 1. Create a New Blog Post

Run this command — replace the slug with your post title:

```sh
hugo new content/blog/2026-06-29-my-post-title.markdown
```

This creates `content/blog/2026-06-29-my-post-title.markdown` with starter front matter:

```yaml
---
title: 'My Post Title'
date: '2026-06-29T00:00:00Z'
draft: true
---
```

Open the file and:

1. Set `draft: false` (or delete the `draft` line) when ready to publish
2. Add `tags` if you want: `tags: [go, docker]`
3. Write your content below the `---` in Markdown

### Example post

```yaml
---
title: "My New Post"
date: '2026-06-29T10:00:00Z'
tags: [kubernetes, devops]
---

Your content here. Supports standard Markdown including fenced code blocks:

```go
package main

func main() {}
```
```

---

## 2. Create a New Standalone Page

Create a file directly under `content/`:

```sh
hugo new content/my-page.md
```

Then update the front matter:

```yaml
---
title: "My Page"
---

Page content here.
```

To add the page to the top navigation, add an entry in `hugo.yaml`:

```yaml
menu:
  main:
    - name: My Page
      pageRef: /my-page
      weight: 5   # controls order; lower = further left
```

---

## 3. Preview Locally

```sh
hugo server -D
```

Open [http://localhost:1313](http://localhost:1313) in your browser.

- `-D` includes draft posts so you can preview before publishing
- The server hot-reloads on every file save — no need to restart

Stop the server with `Ctrl+C`.

---

## 4. Deploy

Once you're happy with the content:

```sh
git add content/blog/2026-06-29-my-post-title.markdown
git commit -m "Add post: my post title"
git push origin master
```

That's it. GitHub Actions automatically:

1. Builds the Hugo site (downloading the Hextra theme via Go modules)
2. Deploys it to GitHub Pages at [https://www.montree.me](https://www.montree.me)

You can watch the build progress at:
`https://github.com/gailo22/gailo22.github.com/actions`

Deployment usually takes under 2 minutes.

---

## Front Matter Reference

| Key | Required | Example | Notes |
|-----|----------|---------|-------|
| `title` | yes | `"Hello World"` | Shown as page heading |
| `date` | yes | `'2026-06-29T10:00:00Z'` | Controls sort order |
| `draft` | no | `true` | Set to `false` or remove to publish |
| `tags` | no | `[java, scala]` | Shown as tags; creates tag pages |
| `description` | no | `"A short summary"` | Used in SEO meta and post cards |
| `weight` | no | `1` | Manual sort order (lower = first) |

---

## Common Mistakes

- **Post not showing up?** Check that `draft: true` is not set.
- **Changes not live after push?** Check the Actions tab for build errors.
- **Local preview different from live?** Run `hugo server` without `-D` to see what production sees.
- **Build fails in Actions?** The Go and Hugo versions are pinned to `stable`/`latest` — if a breaking change occurs, pin them explicitly in `.github/workflows/deploy.yml`.
