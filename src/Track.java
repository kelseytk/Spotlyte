import java.lang.String;
import java.io.*;
/**
 * Track object
 * Contains track name, album, and album id
 *
 * @author Ethan Klein
 * @version April 23, 2020
 */
public class Track {
    private String name;
    private String album;
    private String albumID;
    private int playcount = -1;

    /**
     * Constructor for objects of class Track
     */
    public Track(String name, String album, String albumID) {
        this.name = name;
        this.album = album;
        this.albumID = albumID;
    }

    
    public void printTrack() {
        System.out.println("Name = " + name);
        System.out.println("Album = " + album);
        System.out.println("AlbumID = " + albumID);
        if(this.playcount != -1) { System.out.println("Playcount = " + playcount); }
        
        System.out.println("--------------------------------------------------------------------------------- \n");
    }
    
    public String getName() { return this.name; }
    public String getAlbum() { return this.album; }
    public String getAlbumID() { return this.albumID; }
    public int getPlaycount() { return this.playcount; }
    
    public void setPlaycount(int playcount) { this.playcount = playcount; }
}
