import java.io.*;
import java.lang.ProcessBuilder;
import java.lang.ProcessBuilder.Redirect;
import java.util.Scanner;

/**
 * Tool to extract data from spotify API and get playcount data from playcount API
 *
 * @Ethan Klein
 * @version April 23, 2020
 */
public class DataExtracter {
    String playlistID;
    String playlistName;
    String authorization;
    Process process;
    File file = new File("albumdata.txt");
    File playcountFile = new File("playcountdata.txt");
    File trackFile = new File("tracksdata.txt");
    Track tracks[] = new Track[10000];

    /**
     * Test main
     */
    public static void main(String[] args) {
        System.out.println("Started.");
        DataExtracter data = new DataExtracter("sample", args[0], args[1]);
        System.out.println("Ended.");
    }

    /**
     * Constructor for objects of class DataExtracter
     */
    public DataExtracter(String playlistName, String playlistURL, String authorizationToken) {
        this.playlistID = getPlaylistID(playlistURL);
        this.playlistName = playlistName;
        this.authorization = authorizationToken;
        createDataFile();
        createTracks();
        try {
        Writer wr1 = new FileWriter(trackFile);
        wr1.write("[\n");
        wr1.close();
        
        if(tracks[0] == null) { System.out.println("No tracks found!"); }
        for(int i = 0; tracks[i] != null; i++) {
            System.out.println("song: " + i);
            createPlaycountFile(tracks[i]);
            parsingMain.textToString(playcountFile.getName(), tracks[i].getName());
            tracks[i].setPlaycount(parsingMain.getPlaycount());
            tracks[i].setArtist(parsingMain.getArtist());
            
            //tracks[i].printTrack();
            parsingMain.writePlaylistFile(tracks[i], trackFile.getName());
        }

        Writer wr2 = new FileWriter(trackFile, true);
        wr2.write("\n]");
        wr2.close();

        } catch(Exception e) {
            System.out.println("Track writing failed");
        }

    }

    private String getPlaylistID(String URL) {
        String ID = "";
        String split1[] = URL.split("playlist/");
        String split2[] = split1[1].split("si=");
        ID = split2[0].substring(0, split2[0].length()-1);
        System.out.println(ID);

        return ID;
    }

    /**
     * Writes album names to albumdata.txt 
     * File contains track name, album name, album URI(web URL);
     */
    private void createDataFile() {
        try {
            String command = "curl -X \"GET\" \"https://api.spotify.com/v1/playlists/" + playlistID + 
                "/tracks?fields=items(track(name%2Calbum(name%2Chref)))\" -H \"Content-Type: application/json\" -H \"Authorization: Bearer " + authorization;
            ProcessBuilder builder = new ProcessBuilder(command.split(" "));
            builder.redirectOutput(file);
            Process process = builder.start();
            process.waitFor();

        } catch(Exception e) {
            System.out.println("Error could not create data file");
        }
    }

    private void createTracks() {
        try {
            String name = "";
            String album = "";
            String albumID = "";
            int trackAttributeCounter = 0;
            int tracksCounter = 0;

            if(file.exists()) { System.out.println("File found."); }
            Scanner sc = new Scanner(file);
            if(!sc.hasNextLine()) { System.out.println("No lines found."); }
            while(sc.hasNextLine()) {
                String line = sc.nextLine();
                //System.out.println(line);
                if(trackAttributeCounter == 3) { 
                    trackAttributeCounter = 0;
                    Track currTrack = new Track(name, album, albumID);
                    tracks[tracksCounter] = currTrack;
                    tracksCounter++;
                }
                if(line.contains("        \"href\" :")) {
                    String splitStrings[] = line.split("albums/");
                    albumID = splitStrings[1];
                    albumID = albumID.substring(0, albumID.length()-2);
                    trackAttributeCounter++;
                    System.out.println("ID: " + albumID);
                }else if(line.contains("        \"name\" :")) {
                    String splitStrings[] = line.split("name\" : ");
                    album = splitStrings[1]; 
                    album = album.substring(1, album.length()-1);
                    trackAttributeCounter++;
                    System.out.println("Album: " + album);
                }else if(line.contains("\"name\"")) {
                    String splitStrings[] = line.split("name\" : ");
                    name = splitStrings[1];
                    name = name.substring(1, name.length()-1);
                    trackAttributeCounter++;
                    System.out.println("Song: " + name);
                }
            }

            sc.close();

        }catch (Exception e) {
            System.out.println("SCANNER_ERROR");
        }
    }

    private void createPlaycountFile(Track track) {
        try {
            String launchAPI = "java -jar sp-playcount-librespot-v1.2.jar spotlyteofficial@gmail.com playcount327!";
            ProcessBuilder playcountAPI = new ProcessBuilder(launchAPI.split(" "));
            Process API = playcountAPI.start();
            
            String command = "curl localhost:8080/albumPlayCount?albumid=" + track.getAlbumID();
            ProcessBuilder builder = new ProcessBuilder(command.split(" "));
            builder.redirectOutput(Redirect.appendTo(playcountFile));
            Process process = builder.start();
            process.waitFor();

        } catch(Exception e) { 
            System.out.println("SPOTIFY_PLAYCOUNT_API_ERROR");
        }
    }
}

