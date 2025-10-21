# axiomcura.github.io

Personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Easy to Customize**: Simple structure makes it easy to update content
- **Fast Loading**: Lightweight with minimal dependencies

## Sections

- **Hero**: Eye-catching introduction with call-to-action buttons
- **About**: Personal introduction and background
- **Projects**: Showcase of your work with links to GitHub and demos
- **Skills**: Display of technical skills organized by category
- **Contact**: Social media links and contact information

## Customization

### Update Personal Information

1. **Name and Title**: Edit the hero section in `index.html`
2. **Profile Picture**: Replace `images/profile.svg` with your own photo (recommended: 400x400px, JPG or PNG)
3. **About Section**: Update the about text with your own story
4. **Projects**: Replace the placeholder projects with your own work
5. **Skills**: Modify the skill categories and items to match your expertise
6. **Social Links**: Update the social media links in the contact section

### Add Your Profile Picture

To add your own headshot or profile picture:

1. Save your photo as `images/profile.jpg` or `images/profile.png`
2. Recommended size: 400x400 pixels (square format works best)
3. Update the image path in `index.html` if using a different filename:
   ```html
   <img src="images/profile.jpg" alt="Profile picture" class="profile-image">
   ```

### Customize Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-color: #1f2937;
    --text-light: #6b7280;
    --bg-color: #ffffff;
    --bg-alt: #f9fafb;
}
```

## Deployment

This website is automatically deployed via GitHub Pages. Any push to the main branch will update the live site at https://axiomcura.github.io

## Local Development

Simply open `index.html` in your web browser to view the site locally. No build process required!

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome (for icons)

## License

Feel free to use this template for your own personal website!