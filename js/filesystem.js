/* ==========================================================================
   VIRTUAL FILESYSTEM & NARRATIVE ARCHIVE
   "THE ABANDONED COMPUTER" - Gandhi Hackathon Edition
   Lore: Belonged to Vikram Sharma, an IIT student & cyber enthusiast in 1998-2001
   ========================================================================== */

const VirtualFileSystem = {
  "C:": {
    type: "dir",
    name: "Local Disk (C:)",
    children: {
      "My Documents": {
        type: "dir",
        name: "My Documents",
        children: {
          "1998": {
            type: "dir",
            name: "1998",
            children: {
              "world_cup_1998.jpg": {
                type: "image",
                name: "world_cup_1998.jpg",
                size: "142 KB",
                date: "12-07-1998 23:45",
                caption: "France 1998 World Cup Final! Zidane 2 goals vs Brazil! Absolute madness in the hostel common room TV.",
                data: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23002654'/><rect x='133' width='134' height='300' fill='%23ffffff'/><rect x='267' width='133' height='300' fill='%23ed2939'/><text x='200' y='140' font-family='Arial' font-size='24' font-weight='bold' text-anchor='middle' fill='%23000'>FRANCE 1998</text><text x='200' y='170' font-family='Arial' font-size='16' text-anchor='middle' fill='%23333'>CHAMPIONS DU MONDE</text><circle cx='200' cy='220' r='30' fill='%23ffcc00' stroke='%23000'/><text x='200' y='226' font-family='Arial' font-size='14' font-weight='bold' text-anchor='middle' fill='%23000'>🏆 3-0</text></svg>"
              },
              "titanic_1997.jpg": {
                type: "image",
                name: "titanic_1997.jpg",
                size: "188 KB",
                date: "04-01-1998 19:12",
                caption: "Jack and Rose at the bow of the ship. Leo DiCaprio posters everywhere on the hostel doors.",
                data: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='%23ff7e5f'/><stop offset='100%' stop-color='%23feb47b'/></linearGradient></defs><rect width='400' height='300' fill='url(%23sky)'/><rect y='200' width='400' height='100' fill='%23003366'/><path d='M100 240 L300 240 L280 200 L120 200 Z' fill='%23111'/><text x='200' y='110' font-family='Times New Roman' font-size='32' font-style='italic' text-anchor='middle' fill='%23ffffff'>TITANIC</text><text x='200' y='150' font-family='Arial' font-size='14' text-anchor='middle' fill='%23ffffff'>'I'm the king of the world!'</text></svg>"
              },
              "google_beta_launch.txt": {
                type: "text",
                name: "google_beta_launch.txt",
                size: "1.2 KB",
                date: "04-09-1998 14:15",
                content: `September 4, 1998\n\nFound this new search engine made by two Stanford PhD students: Larry Page & Sergey Brin.\nIt's called "Google!" (with an exclamation mark).\nNo cluttered banners like Yahoo or AltaVista, just a clean white page with a search box.\nTheir "PageRank" algorithm actually ranks results by backlinks instead of keyword spam.\nI predict this might become bigger than Yahoo within 5 years.\nBookmarks: http://google.stanford.edu`
              }
            }
          },
          "1999": {
            type: "dir",
            name: "1999",
            children: {
              "diary_december_1999_y2k.txt": {
                type: "text",
                name: "diary_december_1999_y2k.txt",
                size: "3.4 KB",
                date: "28-12-1999 23:59",
                content: `=== VIKRAM'S PERSONAL LOG - T-MINUS 72 HOURS TO Y2K ===\n\nDecember 28, 1999 - 11:59 PM\n\nThe whole campus is panicking about the Millennium Bug.\nProfessor Rao told us that when the clock strikes 00:00 on Jan 1, 2000, 2-digit date fields in legacy COBOL systems will read '00' as 1900.\nPeople are saying airplanes will fall out of the sky, nuclear plants will scram, and ATM machines will spit out all the currency notes.\n\nPreparations done:\n1. Stocked 24 packs of Maggi noodles under my hostel cot.\n2. Downloaded the entire offline Wikipedia/Encarta dump on 14 floppy disks.\n3. Printed all my semester grades just in case the registrar database wipes.\n4. Downloaded the WinAmp v2.56 installer and 40 MP3s from Napster.\n\nIf society collapses, this computer is my bunker.\nIf I survive, I'm definitely watching The Matrix again.`
              },
              "the_matrix_review.txt": {
                type: "text",
                name: "the_matrix_review.txt",
                size: "1.8 KB",
                date: "14-04-1999 18:30",
                content: `THE MATRIX (1999) - MOVIE LOG\n\nJust watched it at the single-screen theater. My mind is completely blown.\nKeanu Reeves as Neo dodging bullets in slow motion ("bullet time").\nWhat if our Windows 98 desktop is just a computer simulation created by sentient AI machines in 2199?\nTaking the red pill forever.\n\n"Unfortunately, no one can be told what the Matrix is. You have to see it for yourself."`
              }
            }
          },
          "2001": {
            type: "dir",
            name: "2001",
            children: {
              "most_wanted_list.jpg": {
                type: "image",
                name: "most_wanted_list.jpg",
                size: "128 KB",
                date: "18-09-2001 09:22",
                caption: "FBI Ten Most Wanted Fugitives poster archived from the official web portal in September 2001.",
                data: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23f4f1ea'/><rect x='15' y='15' width='370' height='270' fill='none' stroke='%238b0000' stroke-width='4'/><text x='200' y='50' font-family='Impact' font-size='28' fill='%238b0000' text-anchor='middle'>FEDERAL BUREAU OF INVESTIGATION</text><text x='200' y='80' font-family='Arial' font-size='18' font-weight='bold' fill='%23000' text-anchor='middle'>TEN MOST WANTED FUGITIVES</text><rect x='140' y='100' width='120' height='130' fill='%23333'/><circle cx='200' cy='145' r='30' fill='%23555'/><path d='M170 210 Q200 180 230 210 Z' fill='%23555'/><text x='200' y='255' font-family='Arial' font-size='12' font-weight='bold' text-anchor='middle' fill='%238b0000'>REWARD: UP TO $25,000,000</text></svg>"
              },
              "news_clipping_2001.jpg": {
                type: "image",
                name: "news_clipping_2001.jpg",
                size: "165 KB",
                date: "12-09-2001 08:10",
                caption: "New York Times front page scan downloaded via 56k dial-up connection.",
                data: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23f7f5f0'/><text x='200' y='36' font-family='Times New Roman' font-size='26' font-weight='bold' text-anchor='middle'>The Daily Chronicle</text><line x1='30' y1='46' x2='370' y2='46' stroke='%23000'/><text x='200' y='76' font-family='Impact' font-size='30' fill='%23000' text-anchor='middle'>A DAY THAT CHANGED THE WORLD</text><line x1='30' y1='88' x2='370' y2='88' stroke='%23000'/><rect x='40' y='100' width='140' height='170' fill='%23333333'/><text x='110' y='190' font-family='Arial' font-size='14' fill='%23ffffff' text-anchor='middle'>ARCHIVE PHOTO</text><line x1='200' y1='110' x2='360' y2='110' stroke='%23444' stroke-width='2'/><line x1='200' y1='125' x2='360' y2='125' stroke='%23444' stroke-width='2'/><line x1='200' y1='140' x2='340' y2='140' stroke='%23444' stroke-width='2'/><line x1='200' y1='155' x2='360' y2='155' stroke='%23444' stroke-width='2'/><line x1='200' y1='170' x2='350' y2='170' stroke='%23444' stroke-width='2'/><line x1='200' y1='185' x2='360' y2='185' stroke='%23444' stroke-width='2'/></svg>"
              },
              "9-11-attack-planning.pdf": {
                type: "pdf",
                name: "9-11-attack-planning.pdf",
                size: "420 KB",
                date: "14-09-2001 22:04",
                content: `[DECLASSIFIED INTELLIGENCE DOSSIER - SEPT 2001]\n\nDocument ID: DIA-CT-2001-884\nSubject: Preliminary Analysis of Flight Manifests and Coordinated Hijacking Vectors\n\nSummary:\nAnalysis of aviation intelligence indicators from Logan International, Newark, and Dulles airports.\nFlight paths of AA 11, UA 175, AA 77, and UA 93.\nTransponder deactivations logged at:\n08:14 EST - AA 11 transponder off\n08:42 EST - UA 175 transponder change\n\nNotes archived by Vikram Sharma for collegiate model UN conference.`
              }
            }
          },
          "Music": {
            type: "dir",
            name: "Music",
            children: {
              "without_me_eminem.mp3": {
                type: "audio",
                name: "without_me_eminem.mp3",
                size: "4.2 MB",
                date: "15-05-2002 16:30",
                trackIndex: 0
              },
              "darude_sandstorm.mp3": {
                type: "audio",
                name: "darude_sandstorm.mp3",
                size: "3.8 MB",
                date: "02-11-1999 21:10",
                trackIndex: 1
              },
              "doom_e1m1.mid": {
                type: "audio",
                name: "doom_e1m1.mid",
                size: "48 KB",
                date: "10-12-1998 01:20",
                trackIndex: 2
              }
            }
          },
          "Secret_Vault": {
            type: "dir",
            name: "Secret_Vault",
            children: {
              "LATENT_JUDGES_BRIBE_PROTOCOL.txt": {
                type: "text",
                name: "LATENT_JUDGES_BRIBE_PROTOCOL.txt",
                size: "2.1 KB",
                date: "01-11-2026 15:00",
                content: `========================================================================\nCONFIDENTIAL - GANDHI HACKATHON 2026: LATENT PRESENTATION SURVIVAL GUIDE\n========================================================================\n\nTarget: Samay Raina & OpenLake / Meraz Judges\nObjective: Maximize score in the Latent round!\n\nRULEBOOK INSIGHT:\n"Add Easter eggs and elements that make your presentation funny, crazy and entertaining for the judges. You make us laugh and we give you points, deal!!"\n"At the end of your presentation, your team states the score you think you deserve. How close your guess was counts towards your final result."\n\nOUR WINNING FORMULA:\n1. Open MS-DOS Prompt and type 'latent' or 'samay' to run the AI Roast.\n2. Click Clippy to have him offer a bribe of 100 Maggi packets directly to the judges.\n3. Show them the 3D Raycaster running inside Windows 98.\n4. When guessing our score: Predict a solid 9.5/10 with complete poker-faced confidence!`
              },
              "illuminati_dialup_codes.txt": {
                type: "text",
                name: "illuminati_dialup_codes.txt",
                size: "0.8 KB",
                date: "11-11-1999 11:11",
                content: `DIAL-UP NODE ACCESS LIST:\nNode 01: 1800-410-WIN98 (Gateway to Bill Gates' subterranean lair)\nNode 02: 555-AREA51- Roswell alien autopsy video (password: 'clippyiswatching')\nNode 03: 192.168.0.1 - The canteen uncle's secret samosa recipe`
              }
            }
          },
          "canteen_debt_list.txt": {
            type: "text",
            name: "canteen_debt_list.txt",
            size: "0.6 KB",
            date: "15-10-1999 17:00",
            content: `HOSTEL CANTEEN KHATA (PENDING EXPENSES):\n- Bunty: Rs. 42 (Chai & Bun Maska)\n- Raju: Rs. 15 (Special Samosa)\n- Vikram (me): Rs. 120 (Midnight Coffee & Egg Maggi)\n- Total outstanding: Rs. 177\nNote: If Y2K wipes the canteen uncle's paper register, we are officially debt free!`
          }
        }
      },
      "Games": {
        type: "dir",
        name: "Games",
        children: {
          "Minesweeper.exe": { type: "app", name: "Minesweeper.exe", app: "minesweeper", icon: "minesweeper" },
          "Solitaire.exe": { type: "app", name: "Solitaire.exe", app: "solitaire", icon: "solitaire" },
          "SpaceCadetPinball.exe": { type: "app", name: "SpaceCadetPinball.exe", app: "pinball", icon: "pinball" },
          "Doom98.exe": { type: "app", name: "Doom98.exe", app: "raycaster", icon: "doom" }
        }
      },
      "Program Files": {
        type: "dir",
        name: "Program Files",
        children: {
          "Accessories": {
            type: "dir",
            name: "Accessories",
            children: {
              "Paint.exe": { type: "app", name: "Paint.exe", app: "paint", icon: "paint" },
              "Notepad.exe": { type: "app", name: "Notepad.exe", app: "notepad", icon: "notepad" },
              "WordPad.exe": { type: "app", name: "WordPad.exe", app: "wordpad", icon: "wordpad" },
              "Calculator.exe": { type: "app", name: "Calculator.exe", app: "calc", icon: "calc" }
            }
          },
          "Internet Explorer": {
            type: "dir",
            name: "Internet Explorer",
            children: {
              "IEXPLORE.EXE": { type: "app", name: "IEXPLORE.EXE", app: "ie", icon: "ie" }
            }
          },
          "Winamp": {
            type: "dir",
            name: "Winamp",
            children: {
              "winamp.exe": { type: "app", name: "winamp.exe", app: "winamp", icon: "winamp" }
            }
          }
        }
      },
      "WINDOWS": {
        type: "dir",
        name: "WINDOWS",
        children: {
          "SYSTEM32": {
            type: "dir",
            name: "SYSTEM32",
            children: {
              "CMD.EXE": { type: "app", name: "CMD.EXE", app: "dos", icon: "dos" }
            }
          },
          "CRASH_TEST.EXE": {
            type: "app",
            name: "CRASH_TEST.EXE",
            app: "bsod",
            icon: "shutDown"
          }
        }
      }
    }
  }
};

window.VirtualFileSystem = VirtualFileSystem;
