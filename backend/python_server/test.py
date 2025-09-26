#!/usr/bin/env python3
"""
Test script for the /img_img_gen endpoint
"""

import requests
import json
import base64
from PIL import Image
from io import BytesIO
import os
import sys

# Configuration
API_BASE_URL = "https://gazelle-choice-visually.ngrok-free.app/"
ENDPOINT = "/img_img_gen"

def create_test_image():
    """Create a simple test image if none exists"""
    # Create a simple colored rectangle as test image
    img = Image.new('RGB', (200, 200), color='lightblue')
    img.save('test_image.png')
    return 'test_image.png'

def save_base64_image(base64_data, filename):
    """Save base64 image data to file"""
    try:
        # Remove data URI prefix if present
        if base64_data.startswith('data:image'):
            base64_data = base64_data.split(',')[1]
        
        # Decode and save
        image_data = base64.b64decode(base64_data)
        with open(filename, 'wb') as f:
            f.write(image_data)
        print(f"✅ Generated image saved as: {filename}")
        return True
    except Exception as e:
        print(f"❌ Error saving image: {e}")
        return False

def test_img_img_endpoint(image_path, user_input):
    """Test the /img_img_gen endpoint"""
    
    url = f"{API_BASE_URL}{ENDPOINT}"
    
    print(f"🧪 Testing endpoint: {url}")
    print(f"📷 Image: {image_path}")
    print(f"📝 Prompt: {user_input}")
    print("-" * 50)
    
    try:
        # Prepare the files and data
        with open(image_path, 'rb') as f:
            files = {
                'file': (image_path, f, 'image/png')
            }
            data = {
                'user_input': user_input
            }
            
            # Make the request
            print("🚀 Sending request...")
            response = requests.post(url, files=files, data=data, timeout=60)
        
        print(f"📊 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Request successful!")
            
            # Parse response
            result = response.json()
            print(f"📋 Response keys: {list(result.keys())}")
            
            if 'result' in result:
                print(f"🏷️  Detected keyword: {result.get('keyword', 'N/A')}")
                print(f"📄 Input echoed: {result.get('input', 'N/A')}")
                
                # Save the generated image
                output_filename = f"generated_kolam_{result.get('keyword', 'unknown')}.png"
                if save_base64_image(result['result'], output_filename):
                    print(f"🎨 Generated kolam saved!")
                
                return True
            else:
                print("❌ No 'result' field in response")
                print(f"Response: {result}")
                return False
                
        else:
            print(f"❌ Request failed with status {response.status_code}")
            try:
                error_detail = response.json()
                print(f"Error details: {error_detail}")
            except:
                print(f"Error text: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ Request timed out (60s)")
        return False
    except requests.exceptions.ConnectionError:
        print("❌ Connection error - is the API server running?")
        print(f"   Make sure your FastAPI server is running on {API_BASE_URL}")
        return False
    except FileNotFoundError:
        print(f"❌ Image file not found: {image_path}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def run_multiple_tests():
    """Run multiple test scenarios"""
    
    print("🎯 KOLAM API - /img_img_gen Endpoint Test Suite")
    print("=" * 60)
    
    # Test cases
    test_cases = [
        {
            "image": "test_image.png",
            "prompt": "Create a beautiful pulli kolam with dots and geometric patterns",
            "description": "Test 1: Pulli Kolam Generation"
        },
        {
            "image": "test_image.png", 
            "prompt": "Generate a colorful rangoli with flowers and vibrant colors",
            "description": "Test 2: Rangoli Kolam Generation"
        },
        {
            "image": "test_image.png",
            "prompt": "Make a twisted sikku kolam with intricate loops",
            "description": "Test 3: Sikku Kolam Generation"
        }
    ]
    
    # Create test image if it doesn't exist
    if not os.path.exists("test_image.png"):
        print("📷 Creating test image...")
        create_test_image()
    
    results = []
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{test_case['description']}")
        print("-" * 40)
        
        success = test_img_img_endpoint(test_case["image"], test_case["prompt"])
        results.append(success)
        
        if i < len(test_cases):
            input("\n⏸️  Press Enter to continue to next test...")
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(results)
    total = len(results)
    
    for i, (test_case, result) in enumerate(zip(test_cases, results), 1):
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"Test {i}: {status} - {test_case['description']}")
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the error messages above.")

def main():
    """Main function to handle command line arguments"""
    
    if len(sys.argv) == 1:
        # No arguments - run test suite
        run_multiple_tests()
    elif len(sys.argv) == 3:
        # Two arguments - run single test
        image_path = sys.argv[1]
        user_input = sys.argv[2]
        test_img_img_endpoint(image_path, user_input)
    else:
        print("Usage:")
        print("  python test_endpoint.py                                    # Run test suite")
        print("  python test_endpoint.py <image_path> <prompt>              # Single test")
        print("")
        print("Examples:")
        print("  python test_endpoint.py")
        print("  python test_endpoint.py my_kolam.jpg 'Create a pulli kolam'")

if __name__ == "__main__":
    main()