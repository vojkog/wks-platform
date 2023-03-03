const defs = {
    general: {
        case: {
            status: {
                wip: 'Work In Progress',
                closed: 'Closed',
                archived: 'Archived'
            }
        }
    },
    menu: {
        home: 'Dashboard',
        case: 'Generic Case',
        task: 'Tasks',
        record: 'Records'
    },
    submenu: {
        case: {
            '1-motion-detected-form': 'Generic Case',
            '2-motion-detected-form': 'Motion Detected',
            'contractor-onboarding-contractor-on-boarding-form': 'Contractor On Boarding Case'
        },
        record: {
            client: 'Client',
            contractor: 'Contractor'
        }
    },
    pages: {
        dashboard: {
            title: 'My Workspace',
            cards: {
                wipcases: {
                    label: 'Work in Progress'
                },
                caselist: {
                    label: 'All'
                },
                tasklist: {
                    label: 'Tasks'
                }
            }
        },
        caselist: {
            datagrid: {
                columns: {
                    businesskey: 'Business Key',
                    statusdescription: 'Status',
                    stage: 'Stage',
                    createdat: 'Created At'
                },
                action: {
                    details: 'Details'
                }
            },
            action: {
                newcase: 'New Case'
            }
        },
        tasklist: {
            datagrid: {
                columns: {
                    name: 'Task',
                    caseinstanceid: 'Case',
                    processdefinitionid: 'Process',
                    assignee: 'Assignee',
                    created: 'Created',
                    due: 'Due',
                    followup: 'Follow Up'
                },
                toolbar: {
                    columns: 'Columns',
                    filters: 'Filters',
                    density: 'Density',
                    export: 'Export'
                },
                action: {
                    details: 'Details'
                }
            }
        },
        recordlist: {
            datagrid: {
                columns: {
                    name: 'Name',
                    address: 'Address',
                    country: 'Country'
                },
                action: {
                    details: 'Details'
                }
            },
            action: {
                newrecord: 'New'
            }
        }
    }
};

export default defs;
