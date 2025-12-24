function showAbout() {
    about = `
        <h3>About</h3>
        <p>I'm a Software Engineer with a passion for building distributed systems and exploring the frontiers of artificial intelligence. I've spent 8 years designing scalable architectures and solving complex engineering challenges.</p>

        <p>My work sits at the intersection of systems engineering and machine learning. I'm fascinated by how large-scale distributed systems can power intelligent applications, and how we can build resilient infrastructure that scales.</p>

        <p>I hold an M.A. in Business Information Systems from Boğaziçi University and a B.Sc. in Electrical & Electronics Engineering from Özyeğin University. I'm certified as an AWS Solution Architect Associate and Certified Kubernetes Application Developer (CKAD).</p>

        <p>Beyond code, you'll find me grooving to funky rhythms on my bass guitar, diving into game worlds, or exploring nature on hiking trails. I'm also an avid traveler and food enthusiast who believes the best ideas come from diverse experiences.</p>

        <div class="experience">
            <p class="experience-title">Interests & Focus</p>
            <ul class="experience-points">
                <li>Artificial Intelligence & Machine Learning</li>
                <li>Distributed Systems & Scalability</li>
                <li>Cloud-Native Architecture</li>
                <li>Backend Engineering & APIs</li>
                <li>DevOps & Infrastructure Automation</li>
                <li>Open Source Software</li>
            </ul>
        </div>
    `;
    document.getElementById('content').innerHTML = about;
}

function showAntilibrary() {
    antilibrary = `
        <h3>Antilibrary</h3>
        <p>Books I haven't read yet but aspire to dive into. An antilibrary is a reminder of how much there is still to learn.</p>

        <h4>AI & Machine Learning</h4>
        <ul>
            <li>Deep Learning - Ian Goodfellow, Yoshua Bengio, Aaron Courville</li>
            <li>Reinforcement Learning: An Introduction - Richard S. Sutton, Andrew G. Barto</li>
            <li>Pattern Recognition and Machine Learning - Christopher Bishop</li>
            <li>The Hundred-Page Machine Learning Book - Andriy Burkov</li>
        </ul>

        <h4>Distributed Systems</h4>
        <ul>
            <li>Designing Data-Intensive Applications - Martin Kleppmann</li>
            <li>Database Internals - Alex Petrov</li>
            <li>Distributed Systems - Maarten van Steen, Andrew S. Tanenbaum</li>
            <li>Understanding Distributed Systems - Roberto Vitillo</li>
        </ul>

        <h4>Systems & Engineering</h4>
        <ul>
            <li>The Art of Scalability - Martin L. Abbott, Michael T. Fisher</li>
            <li>Site Reliability Engineering - Betsy Beyer, et al.</li>
            <li>Release It! - Michael T. Nygard</li>
            <li>Building Microservices - Sam Newman</li>
        </ul>

        <h4>Thinking & Philosophy</h4>
        <ul>
            <li>Gödel, Escher, Bach - Douglas Hofstadter</li>
            <li>The Master Algorithm - Pedro Domingos</li>
            <li>Superintelligence - Nick Bostrom</li>
            <li>Thinking in Systems - Donella H. Meadows</li>
        </ul>
    `;
    document.getElementById('content').innerHTML = antilibrary;
}

window.addEventListener('DOMContentLoaded', showAbout);
