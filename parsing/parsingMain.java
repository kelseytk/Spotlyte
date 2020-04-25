import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.io.FileWriter;
import java.io.File;

public class parsingMain{
	//Latest playcount and date
	private static int playcount;
	private static int date;
	private static ArrayList<Integer> playcountArray = new ArrayList<Integer>();
	private static ArrayList<Integer> dateArray = new ArrayList<Integer>();
	private static String text;
	private static int songIndex;

	public static void main(String[] args){
		String filename = "GoodFaith.txt";
		String songName = "Nirvana";
		System.out.println(getPlaycount(filename, songName));
		System.out.println(date);
		System.out.println(getArtist(filename, songName));
		//writeTextFile(songName, artist);
	}

	public static ArrayList<Integer> getPlaycountArrayList(){
		return playcountArray;
	}

	public static ArrayList<Integer> getDateArrayList(){
		return dateArray;
	}

	//Returns playcount from txt file
	public static int getPlaycount(String filename, String songName){
		try{
			text = new String(Files.readAllBytes(Paths.get(filename)));
		}
		catch(IOException e){
			e.printStackTrace();
		}
		try{
			songIndex = text.indexOf(songName);
			//9 characters between play count and song name
			int lastDigitIndex = songIndex - 9;
			//Assuming playcount < 100bil, playcount should be between firstIndexGuess and lastDigitIndex
			int firstIndexGuess = lastDigitIndex - 15;
			//Loop through substring to find play count
			String playSub = text.substring(firstIndexGuess, lastDigitIndex);
			String plays = "";
			for(int i = 0; i < playSub.length(); i++){
				if(Character.isDigit(playSub.charAt(i))){
					plays = plays + Character.toString(playSub.charAt(i));
				}
			}
			//Convert string to integer
			playcount = Integer.parseInt(plays);
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println("Error! Not a valid song name");
		}
		//Update date variable
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		String currentDate  = LocalDate.now().format(formatter);
		date = Integer.parseInt(currentDate);
		
		playcountArray.add(playcount);

		dateArray.add(date);

		return playcount;
	}

	public static String getArtist(String filename, String songName){
		String artist = "";
		int nameIndex;
		String subText = text.substring(songIndex);
		nameIndex = subText.indexOf("artists");
		int artistIndex = nameIndex + 19;
		int i = artistIndex;
		while(subText.charAt(i) != '\"'){
			artist = artist + Character.toString(subText.charAt(i));
			i++;
		}
		return artist;
	}
	
/*	public static void writeTextFile(String songName, String artist){
		String newFileName = songName + ".txt";
		try{
			File newFile = new File(newFileName);
			if(!newFile.exists()){
				newFile.createNewFile();
			}
			FileWriter writer = new FileWriter(newFile);
			writer.write(songName);
			writer.write(artist);
			for(int i = 0; i < playcountArray.size(); i++){
				writer.write(playcountArray.get(i).toString());
				writer.write(" ");
			}
			writer.write("\n");
			for(int i = 0; i < dateArray.size(); i++){
				writer.write(dateArray.get(i).toString());
				writer.write(" ");
			}
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}*/	
}

