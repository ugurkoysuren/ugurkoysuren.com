function showAbout() {
    about = `
        <h3>About</h3>
        <p>I build distributed systems and explore AI frontiers. 8 years of designing scalable architectures at the intersection of systems engineering and machine learning.</p>

        <div class="experience">
            <p class="experience-title">Cool Things I've Done</p>
            <ul class="experience-points">
                <li>Large-scale distributed systems for intelligent applications</li>
                <li>AWS Certified Solution Architect & Kubernetes App Developer (CKAD)</li>
                <li>Resilient infrastructure that actually scales</li>
            </ul>
        </div>

        <div class="experience">
            <p class="experience-title">Beyond Code</p>
            <ul class="experience-points">
                <li>Bass guitar, gaming, hiking, traveling, and food hunting</li>
                <li>Best ideas come from diverse experiences</li>
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
