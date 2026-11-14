import { FileText, Plus, UserRound } from "lucide-react";

function ClinicalNotes() {
    const notes = [
        { client: "Arun Kumar", date: "12 Nov 2026", title: "Initial Assessment", description: "Discussed client background and treatment goals." },
        { client: "Priya Sharma", date: "13 Nov 2026", title: "Follow-up Session", description: "Reviewed progress and discussed coping strategies." },
        { client: "Rahul Kumar", date: "14 Nov 2026", title: "Progress Review", description: "Reviewed session progress and future treatment plans." }
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div>
                    <h1>Clinical Notes</h1>
                    <p>Maintain and review client session notes.</p>
                </div>

                <button className="primary-btn">
                    <Plus size={18} />
                    Add Note
                </button>
            </div>

            <div className="dashboard-content">
                {notes.map((note, index) => (
                    <div className="content-card" key={index}>
                        <div className="card-header">
                            <div>
                                <h3>
                                    <FileText size={19} />
                                    {" "}{note.title}
                                </h3>
                                <p>{note.date}</p>
                            </div>
                        </div>

                        <div className="quick-item">
                            <div className="quick-icon purple">
                                <UserRound size={21} />
                            </div>
                            <div>
                                <h4>{note.client}</h4>
                                <p>{note.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClinicalNotes;