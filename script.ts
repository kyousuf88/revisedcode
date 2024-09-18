// Add experience dynamically
function addExperience() {
    const experienceSection = document.getElementById('experience-section') as HTMLElement;
    const newExperience = document.createElement('div');
    newExperience.classList.add('experience');
    newExperience.innerHTML = `
        <label for="jobTitle">Job Title:</label>
        <input type="text" placeholder="Enter job title">

        <label for="company">Company:</label>
        <input type="text" placeholder="Enter company name">

        <label for="jobDescription">Description:</label>
        <textarea rows="3" placeholder="Enter job description"></textarea>
    `;
    experienceSection.insertBefore(newExperience, experienceSection.querySelector('button')!);
}

// Add education dynamically
function addEducation() {
    const educationSection = document.getElementById('education-section') as HTMLElement;
    const newEducation = document.createElement('div');
    newEducation.classList.add('education');
    newEducation.innerHTML = `
        <label for="degree">Degree:</label>
        <input type="text" placeholder="Enter degree">

        <label for="school">School/University:</label>
        <input type="text" placeholder="Enter school name">

        <label for="educationDescription">Description:</label>
        <textarea rows="3" placeholder="Enter description"></textarea>
    `;
    educationSection.insertBefore(newEducation, educationSection.querySelector('button')!);
}

// Generate Resume and Open on Output Page (New Window)
function generateResume() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;

    const profilePicture = (document.getElementById('profilePicture') as HTMLInputElement).files![0];
    const pictureURL = profilePicture ? URL.createObjectURL(profilePicture) : '';

    let educationData = "";
    document.querySelectorAll('.education').forEach((edu) => {
        const degree = (edu.querySelector('input') as HTMLInputElement).value;
        const school = (edu.querySelectorAll('input')[1] as HTMLInputElement).value;
        const description = (edu.querySelector('textarea') as HTMLTextAreaElement).value;
        educationData += `<strong>${degree} from ${school}</strong><br>${description}<br><br>`;
    });

    let experienceData = "";
    document.querySelectorAll('.experience').forEach((exp) => {
        const title = (exp.querySelector('input') as HTMLInputElement).value;
        const company = (exp.querySelectorAll('input')[1] as HTMLInputElement).value;
        const description = (exp.querySelector('textarea') as HTMLTextAreaElement).value;
        experienceData += `<strong>${title} at ${company}</strong><br>${description}<br><br>`;
    });

    const referenceName = (document.getElementById('referenceName') as HTMLInputElement).value;
    const referenceContact = (document.getElementById('referenceContact') as HTMLInputElement).value;

    // Open a new window for the resume output
    const newWindow = window.open("", "_blank");
    newWindow!.document.write(`
        <html>
        <head>
            <title>${name}'s Resume</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="resume-output-page" contenteditable="true">
                ${pictureURL ? `<img src="${pictureURL}" class="profile-picture" alt="Profile Picture">` : ''}
                <h2>${name}</h2>
                <p>Email: ${email}<br>Phone: ${phone}<br>Address: ${address}<br>LinkedIn: ${linkedin}</p>
                <h3>Education</h3>
                <p>${educationData}</p>
                <h3>Experience</h3>
                <p>${experienceData}</p>
                <h3>References</h3>
                <p>${referenceName}<br>Contact: ${referenceContact}</p>
                <div class="resume-actions">
                    <button onclick="window.print()">Print as PDF</button>
                    <button onclick="shareViaEmail()">Share via Email</button>
                    <a href="${generateUniqueURL(name)}">View your resume at: ${generateUniqueURL(name)}</a>
                </div>
            </div>
        </body>
        </html>
    `);
    newWindow!.document.close();
}

// Generate a unique URL based on name
function generateUniqueURL(name: string): string {
    const formattedName = name.replace(/\s+/g, '-').toLowerCase();
    return `https://myresumesite.com/resume/${formattedName}`;
}

// Share via Email
function shareViaEmail() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const subject = encodeURIComponent(`${name}'s Resume`);
    const body = encodeURIComponent(`Please find the attached resume of ${name}.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
