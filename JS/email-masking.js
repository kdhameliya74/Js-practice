function emailMasking(email) {
    const [username, domain] = email.split("@");
    return username[0] + "*".repeat(username.length - 1) + "@" + domain;
}

const emails = [
    "alex.johnson@gmail.com",
    "alex.johnson@outlook.com",
    "alex.johnson@yahoo.com",
    "alex.johnson@icloud.com",
    "alex.johnson@proton.me",
    "alex.johnson@zohomail.com",
    "alex.johnson@aol.com",
    "alex@company.com",
    "alex@university.edu",
    "alex@organization.org",
    "alex@department.gov",
    "alex@company.in"
];

emails.forEach(email => {
    console.log(emailMasking(email));
})
