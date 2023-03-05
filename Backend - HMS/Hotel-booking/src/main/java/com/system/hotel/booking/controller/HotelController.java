package com.system.hotel.booking.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.entity.User;
import com.system.hotel.booking.exception.ResourceNotFoundException;
import com.system.hotel.booking.services.HotelService;
import com.system.hotel.booking.utils.ImageUploadDownloadUtil;

@RestController
@CrossOrigin
@RequestMapping("/hotels")
public class HotelController {

	private final HotelService hotelService;

	public HotelController(HotelService hotelService) {
		this.hotelService = hotelService;
	}
	
	@PostMapping("/createHotel")
	public ResponseEntity<String> createHotel(@ModelAttribute Hotel hotel,
	        @RequestParam(value = "img", required = false) MultipartFile img) throws IOException {
	    try {
	        Hotel savedHotel = hotelService.createHotel(hotel);
	        hotel.setImage(hotel.getId() + img.getOriginalFilename());
	        ImageUploadDownloadUtil imageUploadUtil = new ImageUploadDownloadUtil();
	        String imagePath = "Hotel-Images";
	        imageUploadUtil.uploadImage(savedHotel.getId(), img, imagePath);
	        User savedUser = hotelService.createHotelUser(savedHotel);
	        hotel.setUser(savedUser);
	        hotelService.createHotel(hotel);
	        return ResponseEntity.ok("Hotel Created Successfully");
	    }catch (Exception e) {
	        return ResponseEntity.badRequest().body("Failed to create hotel. " + e.getMessage());
	    }
	}
	
	@GetMapping("/getImage/{img}")
	public ResponseEntity<?> downloadImage(@PathVariable("img") String imgName)
			throws ResourceNotFoundException, IOException, URISyntaxException {
		ImageUploadDownloadUtil downloadUtil = new ImageUploadDownloadUtil();
		String imagePath = "Hotel-Images";
		Resource resource = downloadUtil.getImageAsResource(imgName, imagePath);
		String contentType = "image/png";
		String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, headerValue).body(resource);
	}


	@GetMapping("/getAllHotels")
	public ResponseEntity<List<Hotel>> getAllHotels() {
		try {
			List<Hotel> hotels = hotelService.getAllHotels();
			return ResponseEntity.ok(hotels);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/getHotels")
	public ResponseEntity<List<Hotel>> getHotels(@RequestParam(required = false) String location,
			@RequestParam(required = false) String name) {
		List<Hotel> hotels;
		try {
			if (location != null && name != null) {
				hotels = hotelService.getHotelsByLocationAndName(location, name);
				return ResponseEntity.ok(hotels);
			} else if (location != null) {

				hotels = hotelService.getHotelsByLocation(location);
				return ResponseEntity.ok(hotels);
			} else if (name != null) {
				hotels = hotelService.getHotelsByName(name);
				return ResponseEntity.ok(hotels);
			} else {
				hotels = hotelService.getAllHotels();
				return ResponseEntity.ok(hotels);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
